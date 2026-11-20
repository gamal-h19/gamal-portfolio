export const TEMPLATE_CATEGORIES = [
  { value: "ux", label: "تجربة المستخدم UX" },
  { value: "product-management", label: "إدارة المنتجات" },
] as const

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number]["value"]

export const TEMPLATE_PRICING = [
  { value: "free", label: "مجاني" },
  { value: "paid", label: "مدفوع" },
] as const

export type TemplatePricing = (typeof TEMPLATE_PRICING)[number]["value"]

export type TemplateFormat = "Figma" | "FigJam" | "Notion" | "Google Sheets"

export type Template = {
  id: string
  title: string
  description: string
  category: TemplateCategory
  pricing: TemplatePricing
  /** Required when pricing is "paid". */
  priceUsd?: number
  format: TemplateFormat
  tags: string[]
  /** Download or checkout link; templates without one are requested through the contact page. */
  href?: string
}

export const TEMPLATE_REQUEST_HREF = "/contact"

export const TEMPLATES: Template[] = [
  {
    id: "user-journey-map",
    title: "خريطة رحلة المستخدم",
    description:
      "ارسم رحلة المستخدم من أول تواصل حتى تحقيق هدفه، وحدد نقاط الألم والفرص في كل مرحلة.",
    category: "ux",
    pricing: "free",
    format: "Figma",
    tags: ["رحلة المستخدم", "Journey map", "نقاط الألم"],
  },
  {
    id: "user-interview-guide",
    title: "دليل مقابلات المستخدمين",
    description:
      "أسئلة جاهزة وهيكل واضح لمقابلات المستخدمين، مع جدول لتلخيص الملاحظات واستخراج الأنماط.",
    category: "ux",
    pricing: "free",
    format: "Notion",
    tags: ["أبحاث المستخدمين", "مقابلات", "User research"],
  },
  {
    id: "heuristic-evaluation-checklist",
    title: "قائمة مراجعة قابلية الاستخدام",
    description:
      "قائمة مبنية على مبادئ نيلسن العشرة لتقييم الواجهات بسرعة وترتيب المشكلات حسب خطورتها.",
    category: "ux",
    pricing: "free",
    format: "Google Sheets",
    tags: ["Heuristic evaluation", "قابلية الاستخدام", "مراجعة"],
  },
  {
    id: "user-personas-kit",
    title: "حزمة الشخصيات (Personas)",
    description:
      "قوالب شخصيات مبنية على البيانات، مع خانات للأهداف والدوافع والإحباطات وسياق الاستخدام.",
    category: "ux",
    pricing: "paid",
    priceUsd: 9,
    format: "Figma",
    tags: ["Personas", "الشخصيات", "أبحاث المستخدمين"],
  },
  {
    id: "usability-testing-kit",
    title: "حزمة اختبار قابلية الاستخدام",
    description:
      "خطة اختبار، سيناريوهات مهام، نموذج موافقة، وجدول نتائج يساعدك على تحويل الملاحظات إلى قرارات.",
    category: "ux",
    pricing: "paid",
    priceUsd: 15,
    format: "Notion",
    tags: ["Usability testing", "اختبار المستخدمين", "سيناريوهات"],
  },
  {
    id: "product-requirements-document",
    title: "وثيقة متطلبات المنتج (PRD)",
    description:
      "هيكل واضح لكتابة المشكلة والأهداف ومقاييس النجاح والمتطلبات، يجمع الفريق على فهم واحد.",
    category: "product-management",
    pricing: "free",
    format: "Notion",
    tags: ["PRD", "متطلبات", "توثيق"],
  },
  {
    id: "rice-prioritization-matrix",
    title: "مصفوفة ترتيب الأولويات RICE",
    description:
      "احسب الوصول والأثر والثقة والجهد لكل فكرة، ورتّب قائمة المهام بناءً على أرقام لا آراء.",
    category: "product-management",
    pricing: "free",
    format: "Google Sheets",
    tags: ["RICE", "ترتيب الأولويات", "Backlog"],
  },
  {
    id: "product-roadmap",
    title: "خارطة طريق المنتج",
    description:
      "خارطة طريق مبنية على النتائج (Now / Next / Later) تربط المبادرات بأهداف العمل بوضوح.",
    category: "product-management",
    pricing: "paid",
    priceUsd: 12,
    format: "Google Sheets",
    tags: ["Roadmap", "خارطة الطريق", "OKRs"],
  },
  {
    id: "opportunity-solution-tree",
    title: "شجرة الفرص والحلول",
    description:
      "لوحة اكتشاف المنتج التي تربط النتيجة المطلوبة بالفرص والحلول والتجارب التي تختبرها.",
    category: "product-management",
    pricing: "paid",
    priceUsd: 12,
    format: "FigJam",
    tags: ["Product discovery", "اكتشاف المنتج", "تجارب"],
  },
  {
    id: "launch-readiness-checklist",
    title: "قائمة جاهزية الإطلاق",
    description:
      "كل ما يحتاجه فريقك قبل إطلاق ميزة جديدة: الرسائل، التتبع، الدعم، وخطة المتابعة بعد الإطلاق.",
    category: "product-management",
    pricing: "paid",
    priceUsd: 9,
    format: "Notion",
    tags: ["Launch", "الإطلاق", "Go-to-market"],
  },
]
