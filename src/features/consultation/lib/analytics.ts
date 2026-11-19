import { trackEvent } from "@/lib/events"

import type { ConsultationPaymentMethod } from "./payment"

export const CONSULTATION_BOOKING_URL =
  "https://cal.com/gamal-hassan-n2ar7q/30min"
export const CONSULTATION_PRICE_USD = 10
export const CONSULTATION_DURATION_MIN = 30

export type ConsultationCtaClickSurface = "consultation_page"

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationCtaClick(input: {
  surface: ConsultationCtaClickSurface
}) {
  trackEvent({
    name: "consultation_cta_click",
    properties: {
      surface: input.surface,
      url: CONSULTATION_BOOKING_URL,
      price: CONSULTATION_PRICE_USD,
      duration_min: CONSULTATION_DURATION_MIN,
    },
  })
}

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationPaymentClick(input: {
  method: ConsultationPaymentMethod
  action: "open_link" | "copy"
}) {
  trackEvent({
    name: "consultation_payment_click",
    properties: {
      method: input.method,
      action: input.action,
      price: CONSULTATION_PRICE_USD,
    },
  })
}
