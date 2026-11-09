export const CX_SERIES_ID = "customer-experience-cx"
export const CX_SERIES_TITLE = "دليل تجربة العميل (Customer Experience – CX)"
export const CX_SERIES_DESCRIPTION =
  "رحلة تعليمية متكاملة لفهم تجربة العميل، والبحث في احتياجاته، وتصميم رحلته، وقياس أدائها، وبناء استراتيجية تساعد المؤسسات على تقديم تجارب أفضل."

export type CXSeriesLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"

export type CXSeriesArticle = {
  slug: string
  title: string
  description: string
  number: number
  level: CXSeriesLevel
}

export const CX_SERIES_LEVELS: {
  level: CXSeriesLevel
  title: string
  description: string
}[] = [
  {
    level: "Beginner",
    title: "أساسيات تجربة العميل",
    description: "فهم المفاهيم الأساسية ونقاط التواصل وتوقعات العملاء.",
  },
  {
    level: "Intermediate",
    title: "بحث تجربة العميل وتصميمها",
    description: "جمع صوت العميل وتحليل الرحلات وتصميم تحسينات عملية.",
  },
  {
    level: "Advanced",
    title: "قياس تجربة العميل وتحسينها",
    description: "اختيار المقاييس وتحويل البيانات والشكاوى إلى تحسينات.",
  },
  {
    level: "Expert",
    title: "استراتيجية تجربة العميل وقيادتها",
    description: "ربط التجربة بالاستراتيجية والحوكمة والنتائج المؤسسية.",
  },
]

export const CX_SERIES_ARTICLES: CXSeriesArticle[] = [
  {
    slug: "what-is-customer-experience-cx",
    title: "ما هي تجربة العميل (Customer Experience – CX)؟ دليل شامل للمبتدئين",
    description: "أساسيات CX ومكوناتها ومراحلها وعلاقتها بـ UX وخدمة العملاء.",
    number: 1,
    level: "Beginner",
  },
  {
    slug: "cx-vs-ux-vs-customer-service",
    title: "الفرق بين تجربة العميل (CX) وتجربة المستخدم (UX) وخدمة العملاء",
    description: "مقارنة نطاق كل مجال وكيف تتكامل الأدوار في تجربة واحدة.",
    number: 2,
    level: "Beginner",
  },
  {
    slug: "understanding-customer-needs-expectations",
    title: "كيف يفكر العميل؟ فهم احتياجات العملاء وتوقعاتهم وسلوكهم",
    description: "قراءة دوافع العملاء وسلوكهم والتمييز بين القول والفعل.",
    number: 3,
    level: "Beginner",
  },
  {
    slug: "customer-touchpoints-explained",
    title: "ما هي نقاط التواصل (Touchpoints)؟ وكيف تؤثر في تجربة العميل؟",
    description: "اكتشاف نقاط التواصل والقنوات وتحسين الاتساق بينها.",
    number: 4,
    level: "Beginner",
  },
  {
    slug: "voice-of-customer-voc-guide",
    title: "كيف تجمع صوت العميل (Voice of Customer – VoC) وتحوله إلى Insights؟",
    description: "مصادر VoC وطرق تحليل الملاحظات مع مراعاة تحيزات البيانات.",
    number: 5,
    level: "Intermediate",
  },
  {
    slug: "how-to-create-customer-journey-map",
    title: "كيف تبني خريطة رحلة العميل (Customer Journey Map) خطوة بخطوة؟",
    description: "خطوات إعداد خريطة مبنية على سياق وأدلة وتجربة كاملة.",
    number: 6,
    level: "Intermediate",
  },
  {
    slug: "identify-customer-pain-points",
    title: "كيف تكتشف نقاط الألم (Pain Points) والفرص داخل رحلة العميل؟",
    description: "الوصول إلى الأسباب الجذرية ثم اختيار فرص قابلة للمعالجة.",
    number: 7,
    level: "Intermediate",
  },
  {
    slug: "moments-of-truth-in-customer-experience",
    title: "ما هي لحظات الحقيقة (Moments of Truth)؟ وكيف تصنع تجربة لا تُنسى؟",
    description: "تحديد اللحظات الحاسمة وتصميم استجابة متسقة حولها.",
    number: 8,
    level: "Intermediate",
  },
  {
    slug: "designing-omnichannel-customer-experience",
    title:
      "كيف تصمم تجربة متكاملة عبر القنوات المختلفة (Omnichannel Experience)؟",
    description: "الانتقال من تعدد القنوات إلى تجربة تحفظ السياق والاستمرارية.",
    number: 9,
    level: "Intermediate",
  },
  {
    slug: "customer-experience-metrics-nps-csat-ces",
    title: "كيف تقيس تجربة العميل؟ شرح NPS وCSAT وCES ومتى تستخدم كل مقياس",
    description: "فهم المقاييس الثلاثة واختيارها وقراءة حدودها.",
    number: 10,
    level: "Advanced",
  },
  {
    slug: "turn-customer-feedback-into-action",
    title: "من Feedback إلى Action: كيف تحول بيانات العملاء إلى قرارات تحسين؟",
    description: "من تصنيف الملاحظات إلى الأولويات ومتابعة أثر التغيير.",
    number: 11,
    level: "Advanced",
  },
  {
    slug: "service-recovery-and-complaint-management",
    title: "كيف تتعامل مع تجربة العميل السيئة؟ Service Recovery وإدارة الشكاوى",
    description: "معالجة إخفاقات الخدمة واستعادة الثقة ومنع تكرار المشكلة.",
    number: 12,
    level: "Advanced",
  },
  {
    slug: "customer-experience-business-outcomes",
    title:
      "كيف تربط تجربة العميل بمؤشرات البزنس؟ CX Metrics & Business Outcomes",
    description: "ربط مؤشرات التجربة بالاحتفاظ والتحويل والإيرادات بحذر.",
    number: 13,
    level: "Advanced",
  },
  {
    slug: "building-customer-experience-strategy",
    title: "كيف تبني استراتيجية تجربة العميل (Customer Experience Strategy)؟",
    description: "تحويل الرؤية إلى أهداف ومبادرات ومقاييس وخارطة طريق.",
    number: 14,
    level: "Expert",
  },
  {
    slug: "enterprise-customer-journey-management",
    title: "إدارة رحلة العميل على مستوى المؤسسة (Customer Journey Management)",
    description: "حوكمة الرحلات وتوزيع الملكية والعمل عبر الإدارات.",
    number: 15,
    level: "Expert",
  },
  {
    slug: "building-customer-centric-organization",
    title: "كيف تقود التحول المؤسسي نحو Customer-Centric Organization؟",
    description: "مواءمة القيادة والثقافة والعمليات حول قيمة العميل.",
    number: 16,
    level: "Expert",
  },
  {
    slug: "return-on-customer-experience-investment",
    title:
      "العائد على الاستثمار في تجربة العميل (Return on CX Investment – ROCXI)",
    description: "بناء حجة استثمارية شفافة وقياس العائد وتحديات الإسناد.",
    number: 17,
    level: "Expert",
  },
]

export const CX_SERIES_TOTAL = CX_SERIES_ARTICLES.length
