"use client"

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/kibo-ui/marquee"
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
import type { Testimonial as TestimonialData } from "@/features/portfolio/types/testimonials"

export function TestimonialsMarquee({ data }: { data: TestimonialData[] }) {
  return (
    <Marquee
      aria-label="الشهادات"
      className="border-b border-line bg-background [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
      dir="ltr"
      role="region"
    >
      <MarqueeContent
        autoFill
        className="motion-reduce:[&_.rfm-marquee]:animate-none!"
        direction="right"
        pauseOnHover
        speed={32}
      >
        {data.map((item) => {
          const card = (
            <Testimonial dir="rtl">
              <TestimonialQuote className="min-h-14 text-right">
                <p>{item.quote}</p>
              </TestimonialQuote>

              <TestimonialAuthor>
                <TestimonialAvatar>
                  {item.authorAvatar ? (
                    <TestimonialAvatarImg
                      alt={item.authorName}
                      src={item.authorAvatar}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-full place-items-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground"
                    >
                      {item.authorName.trim().slice(0, 1)}
                    </span>
                  )}
                  <TestimonialAvatarRing />
                </TestimonialAvatar>

                <TestimonialAuthorName className="font-eight font-features-['ss01','zero']">
                  {item.authorName}
                </TestimonialAuthorName>
                {item.authorTagline ? (
                  <TestimonialAuthorTagline className="font-eight font-features-['ss01','zero']">
                    {item.authorTagline}
                  </TestimonialAuthorTagline>
                ) : null}
              </TestimonialAuthor>
            </Testimonial>
          )

          return (
            <MarqueeItem
              key={`${item.authorName}-${item.url ?? item.quote}`}
              className="mx-0 h-full w-68 border-e border-line sm:w-80"
            >
              {item.url ? (
                <a
                  className="block h-full transition-[background-color] ease-out hover:bg-accent/20"
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {card}
                </a>
              ) : (
                <div className="block h-full">{card}</div>
              )}
            </MarqueeItem>
          )
        })}
      </MarqueeContent>
    </Marquee>
  )
}
