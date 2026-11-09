import type { Testimonial } from "../types/testimonials"

export const TESTIMONIALS: Testimonial[] = [
  {
    authorName: "د. عبدالله",
    quote: "شغوف بالتعلم، سريع التطور، ويحقق نتائج ملموسة.",
    order: 1,
  },
  {
    authorName: "د. فيصل",
    quote: "مرن ومتعاون، ويتكيف بانفتاح مع تحديات العمل.",
    order: 2,
  },
  {
    authorName: "عبدالحميد",
    quote: "مميز في تعامله، طموح ومصرّ على التطور.",
    order: 3,
  },
  {
    authorName: "أحمد غلاب",
    authorTagline: "مدير فريق البرمجة",
    quote: "يحوّل احتياجات المنتج لمتطلبات واضحة وينسق بين الفرق.",
    order: 4,
  },
  {
    authorName: "أسماء مبروك",
    authorTagline: "مديرة منتجات",
    quote: "يربط قرارات التصميم بأهداف المنتج واحتياجات المستخدم.",
    order: 5,
  },
  {
    authorName: "عبدالسلام خطاب",
    authorTagline: "رسالة شخصية",
    quote: "يا جمال، بطل وشغلك رهيب!",
    order: 6,
  },
]

export const TESTIMONIALS_VISIBLE = TESTIMONIALS.filter((item) =>
  Boolean(item.quote?.trim().length)
)
