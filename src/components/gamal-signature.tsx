"use client"

import { useEffect, useEffectEvent, useRef } from "react"
import type { AnimationPlaybackControls, MotionValue } from "motion/react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

// The viewport-triggered replay pattern is adapted from ChanhDai's MIT-licensed signature component.
type SignatureValues = {
  progress: MotionValue<number>
  opacity: MotionValue<number>
}

export function GamalSignature({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: "all",
  })
  const shouldReduceMotion = useReducedMotion()

  const progress = useMotionValue(0)
  const opacity = useMotionValue(1)
  const clipPath = useTransform(
    progress,
    (value) => `inset(0 ${100 - value * 100}% 0 0)`
  )

  function sign() {
    controlsRef.current?.stop()
    controlsRef.current = shouldReduceMotion
      ? fadeInSignature({ progress, opacity })
      : revealSignature({ progress, opacity })
  }

  const onFirstView = useEffectEvent(() => {
    if (!controlsRef.current) sign()
  })

  useEffect(() => {
    if (isInView) onFirstView()
  }, [isInView])

  useEffect(() => {
    return () => controlsRef.current?.stop()
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      aria-label="جمال حسن. التوقيع مرة أخرى."
      title="التوقيع مرة أخرى"
      className={cn(
        "inline-flex min-h-4 max-w-full items-center overflow-hidden rounded-sm align-top outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-5",
        className
      )}
      onClick={sign}
    >
      <motion.span
        dir="ltr"
        className="inline-block max-w-full overflow-hidden font-mono text-sm/5 whitespace-nowrap motion-reduce:[clip-path:inset(0)]! sm:text-base/5"
        style={{ clipPath, opacity }}
      >
        Gamal Hassan
      </motion.span>
      <span className="sr-only">التوقيع مرة أخرى</span>
    </button>
  )
}

function revealSignature({ progress, opacity }: SignatureValues) {
  progress.set(0)
  opacity.set(1)

  return animate(progress, 1, {
    duration: 1.6,
    ease: [0.35, 0, 0.65, 0.65],
  })
}

function fadeInSignature({ progress, opacity }: SignatureValues) {
  progress.set(1)
  opacity.set(0)

  return animate(opacity, 1, { duration: 0.2, ease: "easeOut" })
}
