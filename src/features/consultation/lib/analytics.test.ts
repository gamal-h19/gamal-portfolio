import { beforeEach, describe, expect, it, vi } from "vitest"

import { op } from "@/lib/openpanel"

import {
  trackConsultationBookingConfirmed,
  trackConsultationCtaClick,
  trackConsultationPaymentClick,
} from "./analytics"
import { CONSULTATION_PACKAGES } from "./packages"

vi.mock("@/lib/openpanel", () => ({ op: { track: vi.fn() } }))

const [starter, standard, premium] = CONSULTATION_PACKAGES

describe("CONSULTATION_PACKAGES", () => {
  it("offers three packages at 20, 30 and 50 dollars", () => {
    expect(CONSULTATION_PACKAGES.map((pkg) => pkg.priceUsd)).toEqual([
      20, 30, 50,
    ])
  })
})

describe("trackConsultationCtaClick", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the booking click to OpenPanel with the package details", () => {
    trackConsultationCtaClick({ surface: "consultation_page", pkg: standard })

    expect(op.track).toHaveBeenCalledWith("consultation_cta_click", {
      surface: "consultation_page",
      package: "standard",
      url: "https://cal.com/gamal-hassan-n2ar7q/30min",
      price: 30,
      duration_min: 45,
    })
  })
})

describe("trackConsultationBookingConfirmed", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the confirmed package to OpenPanel", () => {
    trackConsultationBookingConfirmed({ pkg: premium })

    expect(op.track).toHaveBeenCalledWith("consultation_booking_confirmed", {
      package: "premium",
      price: 50,
      duration_min: 60,
    })
  })
})

describe("trackConsultationPaymentClick", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the payment method, action and package to OpenPanel", () => {
    trackConsultationPaymentClick({
      method: "instapay",
      action: "open_link",
      pkg: starter,
    })

    expect(op.track).toHaveBeenCalledWith("consultation_payment_click", {
      method: "instapay",
      action: "open_link",
      package: "starter",
      price: 20,
    })
  })
})
