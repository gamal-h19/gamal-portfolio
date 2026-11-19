import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ConsultationPackages } from "@/features/consultation/components/consultation-packages"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"

export function ConsultationContent({
  bookingAvailable,
}: {
  bookingAvailable: boolean
}) {
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
            باقات الاستشارة
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="sm:p-5">
          <ConsultationPackages bookingAvailable={bookingAvailable} />
        </PanelContent>
      </Panel>
    </div>
  )
}
