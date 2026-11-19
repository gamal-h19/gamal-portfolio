export const CONSULTATION_CAL_LINK = "gamal-hassan-n2ar7q/30min"
export const CONSULTATION_BOOKING_URL = `https://cal.com/${CONSULTATION_CAL_LINK}`

export type ConsultationPackageId = "starter" | "standard" | "premium"

export type ConsultationPackage = {
  id: ConsultationPackageId
  name: string
  priceUsd: number
  durationMin: number
  points: string[]
  highlighted?: boolean
}

export const CONSULTATION_PACKAGES: ConsultationPackage[] = [
  {
    id: "starter",
    name: "الباقة الأولى",
    priceUsd: 20,
    durationMin: 30,
    points: [
      "نناقش التحدي الذي تواجهه في منتجك أو تجربة المستخدم.",
      "نحدد أولوية واضحة يمكن البدء بها.",
      "تخرج بخطوة تالية عملية لفريقك.",
    ],
  },
  {
    id: "standard",
    name: "الباقة الثانية",
    priceUsd: 30,
    durationMin: 45,
    highlighted: true,
    points: [
      "كل ما في الباقة الأولى.",
      "نراجع رحلة المستخدم ونحدد نقاط الاحتكاك الأهم.",
      "ملخص مكتوب بالتوصيات بعد الجلسة.",
    ],
  },
  {
    id: "premium",
    name: "الباقة الثالثة",
    priceUsd: 50,
    durationMin: 60,
    points: [
      "كل ما في الباقة الثانية.",
      "مراجعة شاشاتك أو نموذجك الأولي قبل الجلسة.",
      "خطة أولويات عملية يبدأ بها فريقك.",
    ],
  },
]
