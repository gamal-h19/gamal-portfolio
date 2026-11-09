import type { Metadata } from "next"

import { CaseStudiesContent } from "./case-studies-content"

export const metadata: Metadata = {
  title: "دراسات الحالة",
  description:
    "تعرّف على مشروعات في التعليم والرعاية البيطرية والخدمات القانونية، من فهم المشكلة إلى تصميم حلول رقمية واضحة.",
  alternates: {
    canonical: "/case-studies",
  },
  keywords: [
    "دراسات الحالة",
    "جمال حسن",
    "تصميم تجربة المستخدم",
    "أبحاث المستخدمين",
    "استراتيجية المنتجات",
    "مشروعات رقمية",
    "جمال حسن",
  ],
  openGraph: {
    title: "دراسات الحالة | جمال حسن",
    description:
      "أمثلة من عملي على مشروعات رقمية في التعليم والرعاية والخدمات القانونية.",
    url: "/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دراسات الحالة | جمال حسن",
    description:
      "أمثلة من عملي على مشروعات رقمية في التعليم والرعاية والخدمات القانونية.",
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}
