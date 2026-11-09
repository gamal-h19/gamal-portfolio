"use client"

import { useEffect, useRef, useState } from "react"

import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/registry/components/testimonial"

export type TestimonialType = {
  authorAvatar?: string
  authorName: string
  authorTagline?: string
  url?: string
  quote?: string
}

export function TestimonialList({
  direction,
  data,
}: {
  direction?: "right" | "left"
  data: TestimonialType[]
}) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [distance, setDistance] = useState(0)

  const visibleData = data.filter(
    (item) => item.quote && item.quote.trim().length > 0
  )
  const shouldAnimate = visibleData.length > 1
  const marqueeData = shouldAnimate
    ? [...visibleData, ...visibleData]
    : visibleData

  useEffect(() => {
    if (!trackRef.current || !shouldAnimate) return

    const updateDistance = () => {
      setDistance(trackRef.current ? trackRef.current.scrollWidth / 2 : 0)
    }

    updateDistance()

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) return

    let frameId = 0
    const handleResize = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateDistance)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [shouldAnimate, visibleData.length])

  const style = {
    ["--marquee-distance" as string]: `${distance}px`,
    animationDirection: direction === "right" ? "reverse" : "normal",
  }

  return (
    <div className="relative overflow-hidden border-y border-line bg-background">
      <div
        ref={trackRef}
        className={
          shouldAnimate
            ? "marquee-track flex w-max items-stretch"
            : "flex w-max items-stretch"
        }
        style={shouldAnimate ? style : undefined}
      >
        {marqueeData.map((item, index) => (
          <div
            key={`${item.authorName}-${item.url || "no-link"}-${index}`}
            className="relative h-full w-68 shrink-0 border-e border-line bg-background last:border-e-0 sm:w-80"
            aria-hidden={index >= visibleData.length}
          >
            {item.url ? (
              <a
                className="block h-full transition-[background-color] hover:bg-accent/15"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={index >= visibleData.length ? -1 : undefined}
              >
                <TestimonialItem {...item} />
              </a>
            ) : (
              <div className="block h-full transition-[background-color] hover:bg-accent/15">
                <TestimonialItem {...item} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialItem({
  authorAvatar,
  authorName,
  authorTagline,
  quote,
}: TestimonialType) {
  if (!quote || !quote.trim()) return null

  return (
    <Testimonial>
      <TestimonialQuote className="min-h-14">
        <p>{quote}</p>
      </TestimonialQuote>

      <TestimonialAuthor>
        {authorAvatar ? (
          <TestimonialAvatar>
            <TestimonialAvatarImg src={authorAvatar} alt={authorName} />
            <TestimonialAvatarRing />
          </TestimonialAvatar>
        ) : null}

        <TestimonialAuthorName>{authorName}</TestimonialAuthorName>
        {authorTagline ? (
          <TestimonialAuthorTagline>{authorTagline}</TestimonialAuthorTagline>
        ) : null}
      </TestimonialAuthor>
    </Testimonial>
  )
}
