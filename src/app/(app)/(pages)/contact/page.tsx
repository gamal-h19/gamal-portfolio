import type { Metadata } from "next"

import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "تواصل",
  description:
    "لديك تحدٍ في تجربة منتجك أو فكرة للتعاون؟ تواصل مع جمال حسن لمناقشة الخطوة المناسبة.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "تواصل",
    "جمال حسن",
    "التعاون في تصميم المنتجات",
    "أبحاث المستخدمين",
    "تواصل مع جمال حسن",
  ],
  openGraph: {
    title: "تواصل | جمال حسن",
    description:
      "أرسل تفاصيل مشروعك أو التحدي الذي تعمل عليه، ولنناقش كيف يمكنني المساعدة.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل | جمال حسن",
    description:
      "أرسل تفاصيل مشروعك أو التحدي الذي تعمل عليه، ولنناقش كيف يمكنني المساعدة.",
  },
}

export default function ContactPage() {
  return <ContactContent />
}
