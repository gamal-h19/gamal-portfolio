import { beforeEach, describe, expect, it, vi } from "vitest"

import { op } from "@/lib/openpanel"

import {
  trackConsultationCtaClick,
  trackConsultationPaymentClick,
} from "./analytics"

vi.mock("@/lib/openpanel", () => ({ op: { track: vi.fn() } }))

describe("trackConsultationCtaClick", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the booking click to OpenPanel with the session details", () => {
    trackConsultationCtaClick({ surface: "consultation_page" })

    expect(op.track).toHaveBeenCalledWith("consultation_cta_click", {
      surface: "consultation_page",
      url: "https://cal.com/gamal-hassan-n2ar7q/30min",
      price: 10,
      duration_min: 30,
    })
  })
})

describe("trackConsultationPaymentClick", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the payment method and action to OpenPanel", () => {
    trackConsultationPaymentClick({ method: "instapay", action: "open_link" })

    expect(op.track).toHaveBeenCalledWith("consultation_payment_click", {
      method: "instapay",
      action: "open_link",
      price: 10,
    })
  })
})
