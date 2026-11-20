import { TEMPLATES, type Template } from "../data/templates"
import { getCartTemplates, getCartTotal, getTemplatePrice } from "./cart"

export const ORDER_PAYMENT_METHODS = ["instapay", "wallet"] as const

export type OrderPaymentMethod = (typeof ORDER_PAYMENT_METHODS)[number]

export const ORDER_PAYMENT_METHOD_LABELS: Record<OrderPaymentMethod, string> = {
  instapay: "InstaPay",
  wallet: "المحفظة الإلكترونية",
}

export type OrderRequest = {
  name: string
  email: string
  templateIds: string[]
  paymentMethod?: OrderPaymentMethod
  paymentReference?: string
}

export type OrderDelivery = {
  templateId: string
  title: string
  url: string
}

/** payment: waits for the transfer to be confirmed; manual: no file yet, sent by hand. */
export type OrderPendingReason = "payment" | "manual"

export type OrderPendingItem = {
  templateId: string
  title: string
  reason: OrderPendingReason
}

export type Order = {
  id: string
  name: string
  email: string
  items: Template[]
  total: number
  paymentMethod?: OrderPaymentMethod
  paymentReference?: string
  deliveries: OrderDelivery[]
  pending: OrderPendingItem[]
}

/** What /api/templates/order answers on success. */
export type OrderResponse = {
  orderId: string
  total: number
  deliveries: OrderDelivery[]
  pending: OrderPendingItem[]
  emailSent: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_REFERENCE_LENGTH = 100

export function isValidEmail(email: string) {
  return email.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(email)
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export function parseOrderRequest(
  body: unknown,
  templates = TEMPLATES
): { ok: true; value: OrderRequest } | { ok: false; error: string } {
  const input = (body ?? {}) as Record<string, unknown>
  const name = readString(input.name)
  const email = readString(input.email)

  if (!name || name.length > MAX_NAME_LENGTH || !isValidEmail(email)) {
    return { ok: false, error: "تحقق من الاسم والبريد الإلكتروني." }
  }

  const items = getCartTemplates(input.templateIds, templates)

  if (
    items.length === 0 ||
    !Array.isArray(input.templateIds) ||
    items.length !== input.templateIds.length
  ) {
    return {
      ok: false,
      error:
        "السلة فارغة أو فيها قوالب لم تعد متاحة. حدّث السلة وحاول مرة أخرى.",
    }
  }

  const value: OrderRequest = {
    name,
    email,
    templateIds: items.map(({ id }) => id),
  }

  if (getCartTotal(items) > 0) {
    const method = readString(input.paymentMethod)
    if (!ORDER_PAYMENT_METHODS.includes(method as OrderPaymentMethod)) {
      return { ok: false, error: "اختر طريقة الدفع التي حوّلت بها المبلغ." }
    }
    value.paymentMethod = method as OrderPaymentMethod

    const reference = readString(input.paymentReference)
    if (reference.length > MAX_REFERENCE_LENGTH) {
      return { ok: false, error: "رقم العملية أطول من المتوقع." }
    }
    if (reference) {
      value.paymentReference = reference
    }
  }

  return { ok: true, value }
}

/** A Google Sheets copy link first, else the template's file on this site. */
export function getTemplateDeliveryUrl(template: Template, origin: string) {
  if (template.sheetUrl) {
    return template.sheetUrl
  }

  if (template.href?.startsWith("/downloads/")) {
    return new URL(template.href, origin).toString()
  }

  if (template.href?.startsWith("http")) {
    return template.href
  }

  return undefined
}

export function createOrderId(now = Date.now(), random = Math.random()) {
  const time = now.toString(36).toUpperCase()
  const suffix = Math.floor(random * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")

  return `T-${time}-${suffix}`
}

export function buildOrder(
  request: OrderRequest,
  origin: string,
  id = createOrderId(),
  templates = TEMPLATES
): Order {
  const items = getCartTemplates(request.templateIds, templates)
  const deliveries: OrderDelivery[] = []
  const pending: OrderPendingItem[] = []

  for (const template of items) {
    if (getTemplatePrice(template) > 0) {
      pending.push({
        templateId: template.id,
        title: template.title,
        reason: "payment",
      })
      continue
    }

    const url = getTemplateDeliveryUrl(template, origin)
    if (url) {
      deliveries.push({ templateId: template.id, title: template.title, url })
    } else {
      pending.push({
        templateId: template.id,
        title: template.title,
        reason: "manual",
      })
    }
  }

  return {
    id,
    name: request.name,
    email: request.email,
    items,
    total: getCartTotal(items),
    paymentMethod: request.paymentMethod,
    paymentReference: request.paymentReference,
    deliveries,
    pending,
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      default:
        return "&#39;"
    }
  })
}

function renderLink(url: string) {
  const safe = escapeHtml(url)
  return `<a href="${safe}" dir="ltr">${safe}</a>`
}

export function renderCustomerEmail(order: Order) {
  const deliveries = order.deliveries
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.title)}</strong><br />${renderLink(item.url)}</li>`
    )
    .join("")

  const waitingPayment = order.pending.filter(
    ({ reason }) => reason === "payment"
  )
  const waitingManual = order.pending.filter(
    ({ reason }) => reason === "manual"
  )
  const list = (items: OrderPendingItem[]) =>
    items.map((item) => `<li>${escapeHtml(item.title)}</li>`).join("")

  return {
    subject: `طلبك ${order.id}: قوالب جمال حسن`,
    html: `
      <div dir="rtl" style="font-family: sans-serif; line-height: 1.7">
        <p>أهلًا ${escapeHtml(order.name)}،</p>
        <p>شكرًا لطلبك. رقم الطلب: <strong dir="ltr">${escapeHtml(order.id)}</strong></p>
        ${
          deliveries
            ? `<h3>قوالبك جاهزة</h3><ul>${deliveries}</ul>
               <p>افتح الرابط، ثم من «ملف» اختر «إنشاء نسخة» أو «حفظ كجداول بيانات Google» لتعمل على نسختك.</p>`
            : ""
        }
        ${
          waitingPayment.length > 0
            ? `<h3>بانتظار تأكيد الدفع</h3><ul>${list(waitingPayment)}</ul>
               <p>سأراجع التحويل وأرسل لك روابط هذه القوالب على هذا البريد بعد تأكيده.</p>`
            : ""
        }
        ${
          waitingManual.length > 0
            ? `<h3>تصلك قريبًا</h3><ul>${list(waitingManual)}</ul>
               <p>سأرسل لك روابط هذه القوالب على هذا البريد.</p>`
            : ""
        }
        <p>جمال حسن</p>
      </div>
    `,
  }
}

export function renderOwnerEmail(order: Order, origin: string) {
  const rows = order.items
    .map((template) => {
      const url = getTemplateDeliveryUrl(template, origin)
      const price = getTemplatePrice(template)
      return `<li><strong>${escapeHtml(template.title)}</strong> (${price === 0 ? "مجاني" : `${price}$`})<br />${
        url ? renderLink(url) : "لا يوجد رابط للقالب بعد"
      }</li>`
    })
    .join("")

  const needsAction = order.pending.length > 0

  return {
    subject: `طلب قوالب ${order.id}${order.total > 0 ? ` · ${order.total}$ بانتظار تأكيد الدفع` : ""}`,
    html: `
      <div dir="rtl" style="font-family: sans-serif; line-height: 1.7">
        <h3>طلب قوالب جديد</h3>
        <p><strong>رقم الطلب:</strong> <span dir="ltr">${escapeHtml(order.id)}</span></p>
        <p><strong>الاسم:</strong> ${escapeHtml(order.name)}</p>
        <p><strong>البريد:</strong> <span dir="ltr">${escapeHtml(order.email)}</span></p>
        <p><strong>الإجمالي:</strong> ${order.total === 0 ? "مجاني" : `${order.total}$`}</p>
        ${
          order.paymentMethod
            ? `<p><strong>طريقة الدفع:</strong> ${ORDER_PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
               <p><strong>رقم العملية أو اسم المحوِّل:</strong> ${escapeHtml(order.paymentReference ?? "لم يُذكر")}</p>`
            : ""
        }
        <h4>القوالب</h4>
        <ul>${rows}</ul>
        ${
          needsAction
            ? `<p><strong>مطلوب منك:</strong> ${
                order.total > 0
                  ? "راجع وصول التحويل، ثم أرسل للعميل روابط القوالب المدفوعة بالرد على هذه الرسالة."
                  : "أرسل للعميل روابط القوالب التي لا رابط لها بعد."
              }</p>`
            : "<p>وصلت للعميل روابط كل القوالب تلقائيًا.</p>"
        }
      </div>
    `,
  }
}
