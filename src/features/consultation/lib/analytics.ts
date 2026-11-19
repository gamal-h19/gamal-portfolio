import { trackEvent } from "@/lib/events"

export const CONSULTATION_BOOKING_URL =
  "https://cal.com/gamal-hassan-n2ar7q/30min"
export const CONSULTATION_PRICE_USD = 10
export const CONSULTATION_DURATION_MIN = 30

export type ConsultationBookClickSurface = "consultation_page"

/** Client-only: OpenPanel is a browser SDK. */
export function trackConsultationBookClick(input: {
  surface: ConsultationBookClickSurface
}) {
  trackEvent({
    name: "consultation_book_click",
    properties: {
      surface: input.surface,
      url: CONSULTATION_BOOKING_URL,
      price: CONSULTATION_PRICE_USD,
      duration_min: CONSULTATION_DURATION_MIN,
    },
  })
}
