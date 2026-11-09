"use client"

import { useRef } from "react"
import { useInView, usePageInView } from "motion/react"

import { TextSwap } from "@/registry/components/text-swap"

function renderArabicTagline(text: string) {
  return text
    .split(/([A-Za-z0-9]+(?:[ &/.-]+[A-Za-z0-9]+)*)/g)
    .map((part, index) =>
      /^[A-Za-z0-9]/.test(part) ? (
        <span key={index} className="font-mono">
          {part}
        </span>
      ) : (
        part
      )
    )
}

export function ProfileTaglines({
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "ref"> & {
  children: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isPageInView = usePageInView()
  const isInView = useInView(ref)

  return (
    <div ref={ref} {...props}>
      <TextSwap
        className="max-w-full truncate font-sans text-sm text-muted-foreground"
        interval={3}
        play={isPageInView && isInView}
      >
        {children.map((text, index) => (
          <span key={index}>{renderArabicTagline(text)}</span>
        ))}
      </TextSwap>
    </div>
  )
}
