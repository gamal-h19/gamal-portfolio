import { describe, expect, it } from "vitest"

import { getTemplateById } from "./get-template"
import {
  buildOrder,
  createOrderId,
  getTemplateDeliveryUrl,
  parseOrderRequest,
  renderCustomerEmail,
  renderOwnerEmail,
} from "./order"

const ORIGIN = "https://example.com"

describe("parseOrderRequest", () => {
  it("accepts a free order without payment", () => {
    const result = parseOrderRequest({
      name: " Ahmed ",
      email: "ahmed@example.com",
      templateIds: ["user-journey-map"],
    })
    expect(result).toEqual({
      ok: true,
      value: {
        name: "Ahmed",
        email: "ahmed@example.com",
        templateIds: ["user-journey-map"],
      },
    })
  })

  it("rejects a bad email or a missing name", () => {
    expect(
      parseOrderRequest({
        name: "Ahmed",
        email: "not-an-email",
        templateIds: ["user-journey-map"],
      }).ok
    ).toBe(false)
    expect(
      parseOrderRequest({
        name: "",
        email: "ahmed@example.com",
        templateIds: ["user-journey-map"],
      }).ok
    ).toBe(false)
  })

  it("rejects an empty cart, unknown and repeated templates", () => {
    const order = { name: "Ahmed", email: "ahmed@example.com" }
    expect(parseOrderRequest({ ...order, templateIds: [] }).ok).toBe(false)
    expect(
      parseOrderRequest({ ...order, templateIds: ["user-journey-map", "x"] }).ok
    ).toBe(false)
    expect(
      parseOrderRequest({
        ...order,
        templateIds: ["user-journey-map", "user-journey-map"],
      }).ok
    ).toBe(false)
  })

  it("requires a payment method when the total is not zero", () => {
    const order = {
      name: "Ahmed",
      email: "ahmed@example.com",
      templateIds: ["product-roadmap"],
    }
    expect(parseOrderRequest(order).ok).toBe(false)
    expect(parseOrderRequest({ ...order, paymentMethod: "card" }).ok).toBe(
      false
    )
    expect(
      parseOrderRequest({
        ...order,
        paymentMethod: "instapay",
        paymentReference: " 12345 ",
      })
    ).toEqual({
      ok: true,
      value: { ...order, paymentMethod: "instapay", paymentReference: "12345" },
    })
  })
})

describe("getTemplateDeliveryUrl", () => {
  it("makes a file on this site absolute", () => {
    const template = getTemplateById("heuristic-evaluation-checklist")!
    expect(getTemplateDeliveryUrl(template, ORIGIN)).toBe(
      "https://example.com/downloads/templates/heuristic-evaluation-checklist.xlsx"
    )
  })

  it("prefers the Google Sheets link", () => {
    const template = {
      ...getTemplateById("heuristic-evaluation-checklist")!,
      sheetUrl: "https://docs.google.com/spreadsheets/d/abc/copy",
    }
    expect(getTemplateDeliveryUrl(template, ORIGIN)).toBe(
      "https://docs.google.com/spreadsheets/d/abc/copy"
    )
  })

  it("answers undefined for a template with no file", () => {
    expect(
      getTemplateDeliveryUrl(getTemplateById("user-journey-map")!, ORIGIN)
    ).toBeUndefined()
  })
})

describe("buildOrder", () => {
  it("delivers free templates now and holds paid ones for payment", () => {
    const order = buildOrder(
      {
        name: "Ahmed",
        email: "ahmed@example.com",
        templateIds: [
          "heuristic-evaluation-checklist",
          "user-journey-map",
          "ux-research-repository",
        ],
        paymentMethod: "wallet",
      },
      ORIGIN,
      "T-1"
    )

    expect(order.total).toBe(12)
    expect(order.deliveries.map(({ templateId }) => templateId)).toEqual([
      "heuristic-evaluation-checklist",
    ])
    expect(order.pending).toEqual([
      {
        templateId: "user-journey-map",
        title: "خريطة رحلة المستخدم",
        reason: "manual",
      },
      {
        templateId: "ux-research-repository",
        title: "مستودع أبحاث المستخدمين",
        reason: "payment",
      },
    ])
  })
})

describe("emails", () => {
  const order = buildOrder(
    {
      name: "<b>Ahmed</b>",
      email: "ahmed@example.com",
      templateIds: ["heuristic-evaluation-checklist", "ux-research-repository"],
      paymentMethod: "instapay",
    },
    ORIGIN,
    "T-1"
  )

  it("escapes what the customer typed", () => {
    expect(renderCustomerEmail(order).html).not.toContain("<b>Ahmed</b>")
    expect(renderOwnerEmail(order, ORIGIN).html).toContain("&lt;b&gt;Ahmed")
  })

  it("gives the customer free links only", () => {
    const { html } = renderCustomerEmail(order)
    expect(html).toContain("heuristic-evaluation-checklist.xlsx")
    expect(html).not.toContain("ux-research-repository.xlsx")
  })

  it("gives the owner every link to forward", () => {
    const { html, subject } = renderOwnerEmail(order, ORIGIN)
    expect(html).toContain("ux-research-repository.xlsx")
    expect(subject).toContain("12$")
  })
})

describe("createOrderId", () => {
  it("is stable for the same inputs", () => {
    expect(createOrderId(0, 0)).toBe("T-0-0000")
  })
})
