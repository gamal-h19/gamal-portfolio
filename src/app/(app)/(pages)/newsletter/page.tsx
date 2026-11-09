import type { Metadata } from "next"

import { NewsletterContent } from "./newsletter-content"

export const metadata: Metadata = {
  title: "النشرة البريدية",
  description:
    "رسائل قصيرة بأدوات ودروس عملية من أبحاث المستخدمين وتصميم المنتجات، لتساعدك على اتخاذ قرارات أفضل.",
  alternates: {
    canonical: "/newsletter",
  },
  keywords: [
    "النشرة البريدية",
    "أبحاث المستخدمين",
    "تصميم المنتجات",
    "تطوير المنتجات الرقمية",
    "جمال حسن",
  ],
  openGraph: {
    title: "النشرة البريدية | جمال حسن",
    description:
      "رسائل قصيرة بأدوات ودروس عملية من أبحاث المستخدمين وتصميم المنتجات.",
    url: "/newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "النشرة البريدية | جمال حسن",
    description:
      "رسائل قصيرة بأدوات ودروس عملية من أبحاث المستخدمين وتصميم المنتجات.",
  },
}

export default function NewsletterPage() {
  return <NewsletterContent />
}
