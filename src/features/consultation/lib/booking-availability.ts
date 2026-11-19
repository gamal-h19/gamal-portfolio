import { unstable_cache } from "next/cache"

import { CONSULTATION_BOOKING_URL } from "./packages"

/**
 * Only a network failure, a timeout or a 5xx counts as down: cal.com may answer
 * a server-side HEAD with a 4xx (bot protection, method not allowed) while the
 * page still opens fine in a browser, and hiding the button then would lose bookings.
 */
export const isConsultationBookingAvailable = unstable_cache(
  async () => {
    try {
      const response = await fetch(CONSULTATION_BOOKING_URL, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(3000),
      })
      return response.status < 500
    } catch {
      return false
    }
  },
  ["consultation-booking-availability"],
  { revalidate: 300 }
)
