"use client"

import { TestimonialsMarquee } from "@/components/testimonials-marquee"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { TESTIMONIALS_VISIBLE } from "@/features/portfolio/data/testimonials"

export function Testimonials() {
  return (
    <Panel id="testimonials" dir="rtl">
      <PanelHeader>
        <PanelTitle className="text-right font-features-['ss01','zero'] text-3xl leading-[1.15] font-medium tracking-[0.5px]">
          قالوا عني
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <p className="screen-line-bottom px-4 pt-4 pb-3 text-right text-base/relaxed text-balance text-muted-foreground">
          آراء زملاء وشركاء عمل عن تجربة التعاون.
        </p>

        {TESTIMONIALS_VISIBLE.length > 0 ? (
          <TestimonialsMarquee data={TESTIMONIALS_VISIBLE} />
        ) : null}
      </PanelContent>
    </Panel>
  )
}
