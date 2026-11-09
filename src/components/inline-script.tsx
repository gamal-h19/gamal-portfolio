"use client"

import { useId } from "react"
import Script from "next/script"

export function InlineScript({ html }: { html: string }) {
  const id = useId()

  return (
    <Script
      id={`inline-script-${id}`}
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
