import type { Metadata } from "next"

import { isConsultationBookingAvailable } from "@/features/consultation/lib/booking-availability"

import { ConsultationContent } from "./consultation-content"

export const metadata: Metadata = {
  title: "استشارة",
  description:
    "احجز جلسة استشارية مع جمال حسن من بين 3 باقات (20$ و30$ و50$) لمناقشة تحدي تجربة المستخدم أو المنتج الذي تعمل عليه.",
  alternates: {
    canonical: "/consultation",
  },
  keywords: [
    "استشارة",
    "جلسة استشارية",
    "جمال حسن",
    "استشارة تجربة المستخدم",
    "استشارة إدارة المنتجات",
  ],
  openGraph: {
    title: "استشارة | جمال حسن",
    description:
      "جلسة استشارية مركّزة من 30 إلى 60 دقيقة لمناقشة منتجك وتحديد الخطوة التالية.",
    url: "/consultation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "استشارة | جمال حسن",
    description:
      "جلسة استشارية مركّزة من 30 إلى 60 دقيقة لمناقشة منتجك وتحديد الخطوة التالية.",
  },
}

export default async function ConsultationPage() {
  const bookingAvailable = await isConsultationBookingAvailable()
  return <ConsultationContent bookingAvailable={bookingAvailable} />
}
