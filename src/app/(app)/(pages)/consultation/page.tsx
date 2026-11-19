import type { Metadata } from "next"

import { isConsultationBookingAvailable } from "@/features/consultation/lib/booking-availability"

import { ConsultationContent } from "./consultation-content"

export const metadata: Metadata = {
  title: "استشارة",
  description:
    "احجز جلسة استشارية لمدة 30 دقيقة مع جمال حسن لمناقشة تحدي تجربة المستخدم أو المنتج الذي تعمل عليه.",
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
      "جلسة استشارية مركّزة لمدة 30 دقيقة لمناقشة منتجك وتحديد الخطوة التالية.",
    url: "/consultation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "استشارة | جمال حسن",
    description:
      "جلسة استشارية مركّزة لمدة 30 دقيقة لمناقشة منتجك وتحديد الخطوة التالية.",
  },
}

export default async function ConsultationPage() {
  const bookingAvailable = await isConsultationBookingAvailable()
  return <ConsultationContent bookingAvailable={bookingAvailable} />
}
