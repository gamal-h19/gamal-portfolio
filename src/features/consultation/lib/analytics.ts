import { trackEvent } from "@/lib/events"

import type { ConsultationPackage } from "./packages"
import { CONSULTATION_BOOKING_URL } from "./packages"
import type { ConsultationPaymentMethod } from "./payment"

export type ConsultationCtaClickSurface = "consultation_page"

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationCtaClick(input: {
  surface: ConsultationCtaClickSurface
  pkg: ConsultationPackage
}) {
  trackEvent({
    name: "consultation_cta_click",
    properties: {
      surface: input.surface,
      package: input.pkg.id,
      url: CONSULTATION_BOOKING_URL,
      price: input.pkg.priceUsd,
      duration_min: input.pkg.durationMin,
    },
  })
}

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationBookingConfirmed(input: {
  pkg: ConsultationPackage
}) {
  trackEvent({
    name: "consultation_booking_confirmed",
    properties: {
      package: input.pkg.id,
      price: input.pkg.priceUsd,
      duration_min: input.pkg.durationMin,
    },
  })
}

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationPaymentClick(input: {
  method: ConsultationPaymentMethod
  action: "open_link" | "copy"
  pkg: ConsultationPackage
}) {
  trackEvent({
    name: "consultation_payment_click",
    properties: {
      method: input.method,
      action: input.action,
      package: input.pkg.id,
      price: input.pkg.priceUsd,
    },
  })
}
