import type { Metadata } from "next"

import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { CartView } from "@/features/templates/components/cart-view"

export const metadata: Metadata = {
  title: "السلة",
  alternates: { canonical: "/cart" },
  robots: { index: false },
}

export default function Page() {
  return (
    <div dir="rtl" className="min-h-svh pb-8">
      <PageHeading>
        <PageHeadingTagline>السلة</PageHeadingTagline>
        <PageHeadingTitle>سلة القوالب</PageHeadingTitle>
        <PageHeadingDescription>
          راجع القوالب التي اخترتها قبل إتمام الطلب.
        </PageHeadingDescription>
      </PageHeading>

      <CartView />
    </div>
  )
}
