import type { Metadata } from "next"

import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "عنّي",
  description:
    "تعرّف على خبرة جمال حسن في أبحاث المستخدمين وتصميم التجارب وإدارة المنتجات الرقمية في مجالات التعليم والرعاية والخدمات القانونية.",
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "عنّي",
    "جمال حسن",
    "أبحاث المستخدمين",
    "تصميم تجربة المستخدم",
    "إدارة المنتجات الرقمية",
    "خبرة مهنية",
    "جمال حسن",
  ],
  openGraph: {
    title: "عنّي | جمال حسن",
    description:
      "خبرة في أبحاث المستخدمين وتصميم التجارب وإدارة المنتجات الرقمية.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "عنّي | جمال حسن",
    description:
      "خبرة في أبحاث المستخدمين وتصميم التجارب وإدارة المنتجات الرقمية.",
  },
}

export default function AboutPage() {
  return <AboutContent />
}
