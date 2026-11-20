"use client"

import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { TemplatesBrowser } from "@/features/templates/components/templates-browser"
import { TEMPLATES } from "@/features/templates/data/templates"

export function TemplatesContent() {
  return (
    <div dir="rtl" className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>القوالب</PageHeadingTagline>
        <PageHeadingTitle>أدوات جاهزة لعملك اليومي</PageHeadingTitle>
        <PageHeadingDescription>
          قوالب استخدمتها في مشروعات حقيقية لتصميم تجربة المستخدم وإدارة
          المنتجات. ابحث، صفِّ حسب التصنيف أو السعر، وابدأ بها مباشرة.
        </PageHeadingDescription>
      </PageHeading>

      <TemplatesBrowser templates={TEMPLATES} />
    </div>
  )
}
