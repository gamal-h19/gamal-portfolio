"use client"

import { useEffect, useId, useState } from "react"

import { InlineScript } from "@/components/inline-script"

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item"

export function CurrentLocalTimeItem({
  timeZone,
  locationName,
}: CurrentLocalTimeItemProps) {
  const uid = useId()
  const ids = {
    time: `lt-time-${uid}`,
    period: `lt-period-${uid}`,
    hands: `lt-hands-${uid}`,
  }

  const [timeString, setTimeString] = useState<string>("")
  const [periodString, setPeriodString] = useState<string>("")
  // Deterministic 12:00 for SSR; the inline script corrects it before paint.
  const [handsPath, setHandsPath] = useState<string>(() =>
    clockHandsPath(12, 0)
  )

  useEffect(() => {
    const updateTime = () => {
      const { time, period, hour, minute } = computeClock(timeZone)
      setTimeString(time)
      setPeriodString(period)
      setHandsPath(clockHandsPath(hour, minute))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [timeZone])

  return (
    <IntroItem>
      <IntroItemIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path id={ids.hands} d={handsPath} suppressHydrationWarning />
        </svg>
      </IntroItemIcon>

      <IntroItemContent>
        <span id={ids.time} dir="ltr" suppressHydrationWarning>
          {timeString}
        </span>{" "}
        <span
          id={ids.period}
          className="font-sans"
          dir="auto"
          suppressHydrationWarning
        >
          {periodString}
        </span>{" "}
        <span className="font-sans text-muted-foreground">
          · توقيت {locationName}
        </span>
      </IntroItemContent>

      <InlineScript html={getInlineScript(timeZone, ids)} />
    </IntroItem>
  )
}

// Serialized via `.toString()` into the pre-hydration script, so it must stay
// self-contained: globals and arguments only, no module-scope references.
function clockHandsPath(hour: number, minute: number) {
  const h = hour % 12
  const round = (n: number) => Math.round(n * 1000) / 1000

  const minuteAngle = (minute / 60) * 2 * Math.PI
  const hourAngle = ((h + minute / 60) / 12) * 2 * Math.PI

  const hx = round(12 + 3.6 * Math.sin(hourAngle))
  const hy = round(12 - 3.6 * Math.cos(hourAngle))
  const mx = round(12 + 6 * Math.sin(minuteAngle))
  const my = round(12 - 6 * Math.cos(minuteAngle))

  return `M12 12 L${hx} ${hy} M12 12 L${mx} ${my}`
}

// Self-contained (globals only) so it can be serialized via `.toString()` into
// the pre-hydration script as well as called directly from the effect.
function computeClock(timeZone: string) {
  const now = new Date()

  const dateTimeFormat = new Intl.DateTimeFormat("ar-EG", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    numberingSystem: "latn",
  })
  const parts = dateTimeFormat.formatToParts(now)
  const hour = Number(parts.find((part) => part.type === "hour")?.value)
  const minute = Number(parts.find((part) => part.type === "minute")?.value)
  const time = parts
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trimEnd()
  const period = parts.find((part) => part.type === "dayPeriod")?.value ?? ""

  return { time, period, hour, minute }
}

type CurrentLocalTimeItemProps = {
  timeZone: string
  locationName: string
}

type ClockIds = {
  time: string
  period: string
  hands: string
}

// Shared `compute`/`handsPath` are passed as arguments rather than referenced
// because this body is serialized via `.toString()` (globals + args only).
function runClockScript(
  timeZone: string,
  ids: ClockIds,
  compute: typeof computeClock,
  handsPath: typeof clockHandsPath
) {
  try {
    const { time, period, hour, minute } = compute(timeZone)
    const t = document.getElementById(ids.time)
    if (t) t.textContent = time
    const periodElement = document.getElementById(ids.period)
    if (periodElement) periodElement.textContent = period
    const p = document.getElementById(ids.hands)
    if (p) p.setAttribute("d", handsPath(hour, minute))
  } catch {}
}

// Blocking inline script that paints the viewer-local clock before hydration
// (Next.js "prevent flash before hydration"). Sharing `computeClock` with the
// effect guarantees the pre-hydration value matches what React renders.
function getInlineScript(timeZone: string, ids: ClockIds) {
  return `(${runClockScript.toString()})(${JSON.stringify(timeZone)},${JSON.stringify(ids)},${computeClock.toString()},${clockHandsPath.toString()})`
}
