import { beforeEach, describe, expect, it, vi } from "vitest"

import { op } from "@/lib/openpanel"

import { trackConsultationBookClick } from "./analytics"

vi.mock("@/lib/openpanel", () => ({ op: { track: vi.fn() } }))

describe("trackConsultationBookClick", () => {
  beforeEach(() => {
    vi.mocked(op.track).mockClear()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("sends the booking click to OpenPanel with the session details", () => {
    trackConsultationBookClick({ surface: "consultation_page" })

    expect(op.track).toHaveBeenCalledWith("consultation_book_click", {
      surface: "consultation_page",
      url: "https://cal.com/gamal-hassan-n2ar7q/30min",
      price: 10,
      duration_min: 30,
    })
  })
})
