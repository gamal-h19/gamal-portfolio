import { Suspense } from "react"
import type { Metadata } from "next"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"

import { TemplatesContent } from "./templates-content"

const title = "القوالب | جمال حسن"
const description =
  "قوالب عملية لتصميم تجربة المستخدم وإدارة المنتجات: رحلات المستخدم، المقابلات، ترتيب الأولويات وخرائط الطريق، منها المجاني والمدفوع."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/templates",
  },
  keywords: [
    "قوالب",
    "قوالب UX",
    "قوالب إدارة المنتجات",
    "جمال حسن",
    "UX templates",
    "product management templates",
  ],
  openGraph: {
    title,
    description,
    url: "/templates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function TemplatesPage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "الرئيسية", href: "/" },
          { name: "القوالب", href: "/templates" },
        ])}
      />

      <Suspense fallback={<div className="min-h-svh" />}>
        <TemplatesContent />
      </Suspense>
    </>
  )
}
