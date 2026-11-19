"use client"

import { CalendarCheckIcon, CheckIcon, ClockIcon, ZapIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  CONSULTATION_BOOKING_URL,
  CONSULTATION_DURATION_MIN,
  CONSULTATION_PRICE_USD,
  trackConsultationBookClick,
} from "@/features/consultation/lib/analytics"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"

const SESSION_POINTS = [
  "نناقش التحدي الذي تواجهه في منتجك أو تجربة المستخدم.",
  "نحدد أولوية واضحة يمكن البدء بها.",
  "تخرج بخطوة تالية عملية لفريقك.",
]

export function ConsultationContent() {
  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 pb-8 font-eight font-features-['ss01','zero']"
    >
      <PageHeading>
        <PageHeadingTagline>الاستشارات</PageHeadingTagline>
        <PageHeadingTitle className="text-right">
          احجز جلسة استشارية
        </PageHeadingTitle>
        <PageHeadingDescription className="text-right">
          جلسة مركّزة نناقش فيها منتجك والتحدي الذي تعمل عليه، ونحدد معًا الخطوة
          التالية.
        </PageHeadingDescription>
      </PageHeading>

      <Panel id="consultation-booking">
        <PanelHeader>
          <PanelTitle className="text-right tracking-normal" dir="rtl">
            جلسة استشارية
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="sm:p-5">
          <div className="flex flex-col gap-5 rounded-xl border border-line p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <Tag className="w-fit gap-1 font-sans text-foreground">
                  <ZapIcon className="text-primary" />
                  Sprint
                </Tag>
                <h2 className="text-xl font-medium text-foreground">
                  جلسة استشارية فردية
                </h2>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ClockIcon className="size-3.5 text-primary" />
                  {CONSULTATION_DURATION_MIN} دقيقة
                </span>
              </div>

              <p className="flex items-baseline gap-1.5">
                <span
                  dir="ltr"
                  className="text-4xl font-medium text-foreground"
                >
                  {CONSULTATION_PRICE_USD}$
                </span>
                <span className="text-sm text-muted-foreground">للجلسة</span>
              </p>
            </div>

            <ul className="flex flex-col gap-2 border-t border-line pt-4">
              {SESSION_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>

            <Button
              size="sm"
              className="w-full gap-2 sm:w-fit"
              nativeButton={false}
              render={
                <a
                  href={CONSULTATION_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConsultationBookClick({ surface: "consultation_page" })
                  }
                />
              }
            >
              <CalendarCheckIcon className="size-3.5" />
              احجز جلستك الآن
              <span className="sr-only">(يفتح في تبويب جديد)</span>
            </Button>
          </div>
        </PanelContent>
      </Panel>
    </div>
  )
}
