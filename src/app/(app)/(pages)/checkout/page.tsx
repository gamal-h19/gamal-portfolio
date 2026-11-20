import type { Metadata } from "next"

import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { CheckoutView } from "@/features/templates/components/checkout-view"

export const metadata: Metadata = {
  title: "إتمام الطلب",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
}

export default function Page() {
  return (
    <div dir="rtl" className="min-h-svh pb-8">
      <PageHeading>
        <PageHeadingTagline>إتمام الطلب</PageHeadingTagline>
        <PageHeadingTitle>استلم قوالبك</PageHeadingTitle>
        <PageHeadingDescription>
          أدخل اسمك وبريدك، وادفع إن كان في طلبك قالب مدفوع، وتصلك روابط
          القوالب.
        </PageHeadingDescription>
      </PageHeading>

      <CheckoutView />
    </div>
  )
}
