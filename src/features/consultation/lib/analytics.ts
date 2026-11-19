import { trackEvent } from "@/lib/events"

export const CONSULTATION_CAL_LINK = "gamal-hassan-n2ar7q/30min"
export const CONSULTATION_BOOKING_URL = `https://cal.com/${CONSULTATION_CAL_LINK}`
export const CONSULTATION_PRICE_USD = 10
export const CONSULTATION_DURATION_MIN = 30

export type ConsultationSurface = "consultation_page"

const SESSION_PROPERTIES = {
  url: CONSULTATION_BOOKING_URL,
  price: CONSULTATION_PRICE_USD,
  duration_min: CONSULTATION_DURATION_MIN,
}

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationBookClick(input: {
  surface: ConsultationSurface
}) {
  trackEvent({
    name: "consultation_book_click",
    properties: { surface: input.surface, ...SESSION_PROPERTIES },
  })
}

/** Fired by the cal.com embed once a booking is made inside the popup. */
export function trackConsultationBookingComplete(input: {
  surface: ConsultationSurface
  status: string | null
  payment_required: boolean
}) {
  trackEvent({
    name: "consultation_booking_complete",
    properties: { ...input, ...SESSION_PROPERTIES },
  })
}
