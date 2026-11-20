"use client"

import { useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleCheckIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppLink } from "@/components/app-link"
import { CopyButton } from "@/components/copy-button"
import {
  CONSULTATION_INSTAPAY_ADDRESS,
  CONSULTATION_INSTAPAY_URL,
  CONSULTATION_WALLET_NUMBER,
} from "@/features/consultation/lib/payment"

import type { Template } from "../data/templates"
import { useCart } from "../hooks/use-cart"
import { cartNeedsPayment, getCartTotal } from "../lib/cart"
import {
  isValidEmail,
  ORDER_PAYMENT_METHOD_LABELS,
  type OrderPaymentMethod,
  type OrderResponse,
} from "../lib/order"
import { EmptyCart } from "./cart-view"
import { CheckoutSteps } from "./checkout-steps"
import { OrderSummary } from "./order-summary"

const PAYMENT_DETAILS: Record<
  OrderPaymentMethod,
  { value: string; copyLabel: string; hint: string; url?: string }
> = {
  instapay: {
    value: CONSULTATION_INSTAPAY_ADDRESS,
    copyLabel: "انسخ عنوان InstaPay",
    hint: "حوّل إلى هذا العنوان من تطبيق InstaPay، أو افتح رابط الدفع.",
    url: CONSULTATION_INSTAPAY_URL,
  },
  wallet: {
    value: CONSULTATION_WALLET_NUMBER,
    copyLabel: "انسخ رقم المحفظة",
    hint: "حوّل إلى هذا الرقم من تطبيق محفظتك.",
  },
}

type Customer = { name: string; email: string }

function FormField({
  id,
  label,
  hint,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string
  label: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-foreground">
        {label}
      </label>
      <Input id={id} {...props} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  if (!message) {
    return null
  }

  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}

function DetailsStep({
  customer,
  onChange,
  needsPayment,
  isSubmitting,
  error,
  onSubmit,
}: {
  customer: Customer
  onChange: (customer: Customer) => void
  needsPayment: boolean
  isSubmitting: boolean
  error: string
  onSubmit: () => void
}) {
  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">بياناتك</h2>
        <p className="text-sm text-muted-foreground">
          تصلك روابط القوالب على هذا البريد، فتأكد من كتابته صحيحًا.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="checkout-name"
          label="الاسم"
          name="name"
          autoComplete="name"
          value={customer.name}
          onChange={(event) =>
            onChange({ ...customer, name: event.target.value })
          }
          placeholder="مثال: أحمد محمد"
          maxLength={100}
          required
        />
        <FormField
          id="checkout-email"
          label="البريد الإلكتروني"
          type="email"
          name="email"
          autoComplete="email"
          dir="ltr"
          value={customer.email}
          onChange={(event) =>
            onChange({ ...customer, email: event.target.value })
          }
          placeholder="name@company.com"
          required
        />
      </div>

      <ErrorMessage message={error} />

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          size="lg"
          className="flex-1 gap-2"
          disabled={isSubmitting}
        >
          {needsPayment
            ? "متابعة للدفع"
            : isSubmitting
              ? "جارٍ تأكيد الطلب..."
              : "تأكيد الطلب واستلام القوالب"}
          <ArrowLeftIcon className="size-4" aria-hidden />
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="gap-2"
          nativeButton={false}
          render={<AppLink href="/cart" />}
        >
          <ArrowRightIcon className="size-4" aria-hidden />
          الرجوع للسلة
        </Button>
      </div>
    </form>
  )
}

function PaymentStep({
  total,
  method,
  onMethodChange,
  reference,
  onReferenceChange,
  isSubmitting,
  error,
  onBack,
  onSubmit,
}: {
  total: number
  method: OrderPaymentMethod
  onMethodChange: (method: OrderPaymentMethod) => void
  reference: string
  onReferenceChange: (reference: string) => void
  isSubmitting: boolean
  error: string
  onBack: () => void
  onSubmit: () => void
}) {
  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">الدفع</h2>
        <p className="text-sm text-muted-foreground">
          حوّل ما يعادل <bdi dir="ltr">{total}$</bdi> بالجنيه المصري بإحدى
          الطريقتين، ثم أكمل الطلب. تصلك روابط القوالب المدفوعة على بريدك بعد
          تأكيد التحويل.
        </p>
      </div>

      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">طريقة الدفع</legend>
        {(Object.keys(PAYMENT_DETAILS) as OrderPaymentMethod[]).map((key) => {
          const details = PAYMENT_DETAILS[key]
          const isSelected = method === key

          return (
            <div
              key={key}
              className={cn(
                "flex min-w-0 flex-col gap-2 rounded-lg border p-3 transition-colors",
                isSelected
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-line"
              )}
            >
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="payment-method"
                  value={key}
                  checked={isSelected}
                  onChange={() => onMethodChange(key)}
                  className="accent-primary"
                />
                {ORDER_PAYMENT_METHOD_LABELS[key]}
              </label>
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
                <span
                  dir="ltr"
                  className="min-w-0 truncate font-mono text-sm select-all"
                >
                  {details.value}
                </span>
                <CopyButton
                  aria-label={details.copyLabel}
                  className="shrink-0 rounded-md border-none text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5"
                  variant="ghost"
                  size="icon-xs"
                  text={details.value}
                />
              </div>
              <p className="text-xs text-muted-foreground">{details.hint}</p>
              {details.url && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full gap-2"
                  nativeButton={false}
                  render={
                    <a
                      href={details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  ادفع عبر InstaPay
                  <ExternalLinkIcon className="size-3.5" aria-hidden />
                  <span className="sr-only">(يفتح في تبويب جديد)</span>
                </Button>
              )}
            </div>
          )
        })}
      </fieldset>

      <FormField
        id="checkout-reference"
        label="رقم العملية أو اسم المحوِّل (اختياري)"
        hint="يساعدني على مطابقة تحويلك بسرعة."
        name="reference"
        value={reference}
        onChange={(event) => onReferenceChange(event.target.value)}
        maxLength={100}
      />

      <ErrorMessage message={error} />

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          size="lg"
          className="flex-1 gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "جارٍ إرسال الطلب..."
            : error
              ? "حاول مرة أخرى"
              : "حوّلت المبلغ، أكمل الطلب"}
          <ArrowLeftIcon className="size-4" aria-hidden />
        </Button>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="gap-2"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowRightIcon className="size-4" aria-hidden />
          تعديل البيانات
        </Button>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="w-fit text-muted-foreground"
        nativeButton={false}
        render={<AppLink href="/cart" />}
      >
        إلغاء الدفع والرجوع للسلة
      </Button>
    </form>
  )
}

function Confirmation({
  order,
  email,
}: {
  order: OrderResponse
  email: string
}) {
  const waitingPayment = order.pending.filter(
    ({ reason }) => reason === "payment"
  )
  const waitingManual = order.pending.filter(
    ({ reason }) => reason === "manual"
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <CircleCheckIcon className="size-10 text-primary" aria-hidden />
        <h2 className="text-xl font-medium">تم استلام طلبك</h2>
        <p className="text-sm text-muted-foreground">
          رقم الطلب: <bdi className="font-mono">{order.orderId}</bdi>
        </p>
      </div>

      {order.deliveries.length > 0 && (
        <section
          aria-labelledby="deliveries-title"
          className="flex flex-col gap-3"
        >
          <h3 id="deliveries-title" className="text-sm font-medium">
            قوالبك جاهزة
          </h3>
          <ul className="flex flex-col divide-y divide-line rounded-xl border border-line">
            {order.deliveries.map((item) => {
              const isSheet = item.url.includes("docs.google.com")
              const Icon = isSheet ? ExternalLinkIcon : DownloadIcon

              return (
                <li
                  key={item.templateId}
                  className="flex flex-wrap items-center gap-2 p-3"
                >
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {item.title}
                  </span>
                  <CopyButton
                    aria-label={`انسخ رابط ${item.title}`}
                    variant="ghost"
                    size="icon-sm"
                    text={item.url}
                  />
                  <Button
                    size="sm"
                    className="gap-2"
                    nativeButton={false}
                    render={
                      <a href={item.url} target="_blank" rel="noopener" />
                    }
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {isSheet ? "فتح في Google Sheets" : "تحميل الملف"}
                    <span className="sr-only">(يفتح في تبويب جديد)</span>
                  </Button>
                </li>
              )
            })}
          </ul>
          <p className="text-xs/relaxed text-muted-foreground">
            افتح الملف في Google Sheets، ثم من «ملف» اختر «إنشاء نسخة» أو «حفظ
            كجداول بيانات Google» لتعمل على نسختك.
          </p>
        </section>
      )}

      {waitingPayment.length > 0 && (
        <section className="flex flex-col gap-2 rounded-xl border border-line p-4">
          <h3 className="text-sm font-medium">بانتظار تأكيد الدفع</h3>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {waitingPayment.map((item) => (
              <li key={item.templateId}>{item.title}</li>
            ))}
          </ul>
          <p className="text-xs/relaxed text-muted-foreground">
            سأراجع تحويل <bdi dir="ltr">{order.total}$</bdi> وأرسل روابط هذه
            القوالب إلى <bdi dir="ltr">{email}</bdi> بعد تأكيده.
          </p>
        </section>
      )}

      {waitingManual.length > 0 && (
        <section className="flex flex-col gap-2 rounded-xl border border-line p-4">
          <h3 className="text-sm font-medium">تصلك على بريدك</h3>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {waitingManual.map((item) => (
              <li key={item.templateId}>{item.title}</li>
            ))}
          </ul>
          <p className="text-xs/relaxed text-muted-foreground">
            سأرسل روابط هذه القوالب إلى <bdi dir="ltr">{email}</bdi>.
          </p>
        </section>
      )}

      <p className="text-sm text-muted-foreground">
        {order.emailSent ? (
          <>
            أرسلت تفاصيل الطلب{order.deliveries.length > 0 ? " والروابط" : ""}{" "}
            إلى <bdi dir="ltr">{email}</bdi>.
          </>
        ) : (
          "لم يصل بريد تأكيد الطلب، فاحفظ الروابط من هذه الصفحة."
        )}
      </p>

      <Button
        variant="secondary"
        className="w-fit"
        nativeButton={false}
        render={<AppLink href="/templates" />}
      >
        تصفح قوالب أخرى
      </Button>
    </div>
  )
}

export function CheckoutView() {
  const cart = useCart()
  const [step, setStep] = useState<"details" | "payment" | "confirmation">(
    "details"
  )
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "" })
  const [method, setMethod] = useState<OrderPaymentMethod>("instapay")
  const [reference, setReference] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [order, setOrder] = useState<OrderResponse | null>(null)

  const needsPayment = cartNeedsPayment(cart.items)

  if (!cart.isReady) {
    return <div className="min-h-64" aria-busy />
  }

  if (step === "confirmation" && order) {
    return (
      <>
        <CheckoutSteps current="confirmation" needsPayment={order.total > 0} />
        <div className="p-4">
          <Confirmation order={order} email={customer.email.trim()} />
        </div>
      </>
    )
  }

  if (cart.count === 0) {
    return (
      <>
        <CheckoutSteps current="cart" needsPayment={false} />
        <EmptyCart />
      </>
    )
  }

  const submitOrder = async (items: Template[]) => {
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/templates/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customer.name.trim(),
          email: customer.email.trim(),
          templateIds: items.map(({ id }) => id),
          ...(cartNeedsPayment(items)
            ? { paymentMethod: method, paymentReference: reference.trim() }
            : {}),
        }),
      })
      const data = (await response.json().catch(() => ({}))) as
        | OrderResponse
        | { error?: string }

      if (!response.ok || !("orderId" in data)) {
        setError(
          ("error" in data && data.error) ||
            "تعذر إرسال الطلب الآن. حاول مرة أخرى بعد قليل."
        )
        return
      }

      trackEvent({
        name: "template_order_submitted",
        properties: {
          order_id: data.orderId,
          templates: items.length,
          total_usd: getCartTotal(items),
          payment_method: cartNeedsPayment(items) ? method : null,
        },
      })
      setOrder(data)
      setStep("confirmation")
      cart.clear()
      window.scrollTo({ top: 0 })
    } catch {
      setError("تعذر الاتصال. تحقق من الإنترنت وحاول مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitDetails = () => {
    if (!customer.name.trim()) {
      setError("اكتب اسمك.")
      return
    }

    if (!isValidEmail(customer.email.trim())) {
      setError("تحقق من عنوان البريد الإلكتروني.")
      return
    }

    setError("")
    if (needsPayment) {
      setStep("payment")
    } else {
      void submitOrder(cart.items)
    }
  }

  return (
    <>
      <CheckoutSteps current={step} needsPayment={needsPayment} />
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_16rem]">
        {step === "payment" && needsPayment ? (
          <PaymentStep
            total={cart.total}
            method={method}
            onMethodChange={setMethod}
            reference={reference}
            onReferenceChange={setReference}
            isSubmitting={isSubmitting}
            error={error}
            onBack={() => {
              setError("")
              setStep("details")
            }}
            onSubmit={() => void submitOrder(cart.items)}
          />
        ) : (
          <DetailsStep
            customer={customer}
            onChange={(next) => {
              setCustomer(next)
              setError("")
            }}
            needsPayment={needsPayment}
            isSubmitting={isSubmitting}
            error={error}
            onSubmit={submitDetails}
          />
        )}
        <OrderSummary items={cart.items} className="self-start" />
      </div>
    </>
  )
}
