import type { ReactNode } from "react"

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { CaseStudyVisualFigure } from "@/features/portfolio/components/projects/case-study-visual"
import type { CaseStudy } from "@/features/portfolio/data/case-studies"

type VisualGroupDefinition = {
  section: "discovery" | "strategy" | "experience"
  title: string
  description: string
  files: string[]
}

const VISUAL_GROUPS: Record<string, VisualGroupDefinition[]> = {
  "ynmo-daycare": [
    {
      section: "discovery",
      title: "مواد الاكتشاف",
      description:
        "تعرض اللوحات أسئلة البحث وتصنيف الملاحظات والنتائج المجمعة. لا تثبت وحدها تنفيذ مقابلات أو حجم عينة.",
      files: [
        "board-discovery.png",
        "board-interview-questions.png",
        "board-qualitative-research.png",
        "board-research-findings.png",
        "board-persona.png",
      ],
    },
    {
      section: "strategy",
      title: "المنافسة وترتيب الأولويات",
      description:
        "مواد مقارنة وتحليل وتحديد نطاق؛ لا تتضمن درجات أو بيانات سوق رقمية يمكن نسبتها.",
      files: [
        "board-competitor-analysis.png",
        "board-competitor-feature-matrix.png",
        "board-feature-gap-analysis.png",
        "board-prioritization.png",
      ],
    },
    {
      section: "experience",
      title: "بنية المعلومات ومسارات الاستخدام",
      description:
        "خرائط بنية المعلومات وتدفقات المهام المتاحة للمعلمة والأسرة.",
      files: [
        "card-sort-photos.png",
        "information-architecture-teacher.png",
        "information-architecture-guardians.png",
        "user-task-flow.png",
        "user-task-flow-teacher.png",
      ],
    },
    {
      section: "experience",
      title: "بوابة الإدارة والعمليات اليومية",
      description:
        "نماذج شاشات لإدارة الحسابات والطلاب والطاقم والحضور والبرامج والجدولة.",
      files: [
        "registration.png",
        "onboarding.png",
        "dashboard.png",
        "students.png",
        "staff-profile.png",
        "attendance-management.png",
        "programs.png",
        "calendar.png",
        "center-settings.png",
      ],
    },
    {
      section: "experience",
      title: "تواصل الأسرة والعمليات المالية",
      description:
        "واجهات التواصل والمدفوعات كما تظهر في مواد التصميم المتاحة.",
      files: [
        "messages.png",
        "financials-transaction-management.png",
        "financials-plans.png",
        "financials-payout.png",
      ],
    },
  ],
  daawa: [
    {
      section: "experience",
      title: "نظرة عامة على المنتج",
      description:
        "لقطات من صفحة المنتج وقدرات المنصة كما تظهر في التصاميم المتاحة.",
      files: ["product-overview.webp", "product-capabilities.webp"],
    },
    {
      section: "experience",
      title: "التسجيل والتهيئة",
      description: "تسلسل الشاشات المقترح لبدء استخدام المنصة.",
      files: ["onboarding-flow.webp"],
    },
    {
      section: "experience",
      title: "المساعد القانوني",
      description: "تصميم واجهة المساعد القانوني مع عرض المراجع ضمن التجربة.",
      files: ["legal-assistant.webp"],
    },
  ],
}

const CASE_STUDY_CONTEXT: Record<
  string,
  {
    industry: string
    status: string
    role: string[]
    discovery: string[]
    researchLimit: string
    journeyTitle: string
    journey: string[]
    deliveryLimit: string
  }
> = {
  "ynmo-daycare": {
    industry: "تقنية التعليم ورعاية الطفولة",
    status: "رابط التطبيق وبوابة الويب مدرجان ضمن بيانات المشروع",
    role: [
      "التعاون مع المؤسسين لفهم نموذج العمل ونطاق المنتج.",
      "إعداد أسئلة البحث وتنظيم ما توفر من نتائج وملاحظات.",
      "تحليل المنافسين، تنظيم المعلومات، ورسم مسارات الاستخدام.",
      "المساهمة في تحديد نطاق MVP وترتيب الأولويات.",
    ],
    discovery: [
      "تتضمن المواد أسئلة مقابلات واستبيانًا إلكترونيًا ولوحة نتائج مجمعة.",
      "مراجعة الحلول المنافسة ومصفوفة مقارنة للميزات.",
      "Card sorting وخرائط لبنية المعلومات ومسارات المهام.",
      "لا تتضمن المواد حجم العينة أو سجلات جلسات البحث والاختبار.",
    ],
    researchLimit:
      "تثبت الأصول توثيق أسئلة البحث والاستبيان ونتائج مجمعة، لكنها لا توضح إن كانت المقابلات قد نُفذت أو حجم العينة؛ لذلك لا أنسب استنتاجات محددة إلى مشاركين أو اختبارات غير موثقة.",
    journeyTitle: "من التشغيل اليومي إلى تواصل الأسرة",
    journey: [
      "تسجيل الحضور",
      "توثيق النشاط والملاحظات",
      "مراجعة الإدارة",
      "مشاركة تحديث الأسرة",
    ],
    deliveryLimit:
      "تتضمن البيانات تطبيقًا مدرجًا في App Store وبوابة ويب، لكن لا تتوفر تفاصيل توضح أي مخرجات بعينها أُطلقت أو حجم استخدامها.",
  },
  "ynmo-tifli": {
    industry: "تقنية التعليم ونمو الطفل",
    status: "رابط التطبيق مدرج على App Store ضمن بيانات المشروع",
    role: [
      "بحث وتصميم تجربة تطبيق موجّهة للأسرة.",
      "تنظيم الأنشطة وملاحظات مقدمي الرعاية في سياق مفهوم.",
      "تصميم عرض مبسط لمراحل النمو مع مراعاة دقة المعلومات للمختصين.",
      "التعاون مع فرق الهندسة والجودة لمراجعة التفاعلات وعرض البيانات.",
    ],
    discovery: [
      "تصف مادة المشروع الحاجة إلى متابعة التحديثات اليومية ومراحل النمو.",
      "هدف التصميم هو تقديم ملخص سريع القراءة دون حذف التفاصيل المهمة.",
      "توازن التجربة بين لغة مفهومة للأسرة ودقة المحتوى للمختصين.",
    ],
    researchLimit:
      "لا تحدد المواد أسلوب البحث أو العينة أو تفاصيل المراجعة؛ لذلك لا تُنسب النتائج إلى مقابلات أو اختبارات بعينها.",
    journeyTitle: "تنظيم محتوى متابعة الطفل",
    journey: [
      "أنشطة وملاحظات اليوم",
      "ملخص يسهل مراجعته",
      "مراحل النمو بتسلسل واضح",
      "متابعة الأسرة ومناقشتها مع المختص",
    ],
    deliveryLimit:
      "التطبيق مدرج على App Store في بيانات المشروع. لا تتوفر معلومات عن الميزات التي أُطلقت ضمن كل إصدار أو نتائج استخدام مقاسة.",
  },
  daawa: {
    industry: "تقنية الخدمات القانونية",
    status: "حالة تنفيذ إعادة التصميم غير موثقة",
    role: [
      "المساهمة في استراتيجية المنتج وإعادة صياغة تجربة الاستخدام.",
      "تبسيط التسجيل والتهيئة وتوجيه البداية نحو إعداد القضية.",
      "تنظيم تصور متابعة القضية ومراحلها ومواعيدها ووثائقها.",
      "تصميم تصور للمساعد القانوني مع إظهار المصادر لدعم التحقق.",
    ],
    discovery: [
      "تحليل مسار التسجيل لتحديد تكرار البيانات وغموض الخطوات الأولى.",
      "تحديد حاجة المستخدم إلى متابعة حالة القضية والوثائق في سياق واحد.",
      "مواءمة المتطلبات مع الخبراء القانونيين وفريق الهندسة.",
    ],
    researchLimit:
      "لا تتضمن المواد مقابلات أو تحليلات استخدام أو نتائج اختبار موثقة؛ لذلك تُعرض هذه النقاط بوصفها تحليلًا لمسار المنتج لا نتائج بحث ميداني.",
    journeyTitle: "من التسجيل إلى متابعة القضية",
    journey: [
      "التسجيل",
      "إعداد مساحة العمل",
      "إنشاء ملف القضية",
      "متابعة المراحل والوثائق",
    ],
    deliveryLimit:
      "المواد تعرض تصاميم ومفهومًا للمساعد القانوني. لا يوجد ما يثبت إطلاق إعادة التصميم أو المساعد، ولا تتوفر مقاييس أثر.",
  },
}

const SECTION_NAV: Record<string, { id: string; ar: string; en: string }[]> = {
  "ynmo-daycare": [
    { id: "overview", ar: "الملخص", en: "Overview" },
    { id: "challenge", ar: "التحدي", en: "Challenge" },
    { id: "role", ar: "دوري", en: "Role" },
    { id: "discovery", ar: "الاكتشاف", en: "Discovery" },
    { id: "strategy", ar: "الاستراتيجية", en: "Strategy" },
    { id: "experience", ar: "التجربة", en: "Experience" },
    { id: "delivery", ar: "التسليم", en: "Delivery" },
    { id: "outcome", ar: "الأثر", en: "Outcome" },
  ],
  "ynmo-tifli": [
    { id: "overview", ar: "الملخص", en: "Overview" },
    { id: "challenge", ar: "التحدي", en: "Challenge" },
    { id: "role", ar: "دوري", en: "Role" },
    { id: "discovery", ar: "الاكتشاف", en: "Discovery" },
    { id: "strategy", ar: "الاستراتيجية", en: "Strategy" },
    { id: "experience", ar: "التجربة", en: "Experience" },
    { id: "delivery", ar: "التسليم", en: "Delivery" },
    { id: "outcome", ar: "الأثر", en: "Outcome" },
  ],
  daawa: [
    { id: "overview", ar: "الملخص", en: "Overview" },
    { id: "challenge", ar: "التحدي", en: "Challenge" },
    { id: "role", ar: "دوري", en: "Role" },
    { id: "discovery", ar: "الاكتشاف", en: "Discovery" },
    { id: "strategy", ar: "الاستراتيجية", en: "Strategy" },
    { id: "experience", ar: "التجربة", en: "Experience" },
    { id: "delivery", ar: "التسليم", en: "Delivery" },
    { id: "outcome", ar: "الأثر", en: "Outcome" },
  ],
}

function Section({
  id,
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  number: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Panel
      id={id}
      className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
    >
      <PanelHeader className="space-y-2">
        <p className="font-mono text-xs text-primary">
          {number} / {eyebrow}
        </p>
        <PanelTitle className="text-xl tracking-normal sm:text-2xl">
          {title}
        </PanelTitle>
        {description && (
          <p className="max-w-3xl text-sm/relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </PanelHeader>
      {children}
    </Panel>
  )
}

function getVisualGroups(
  study: CaseStudy,
  section: VisualGroupDefinition["section"]
) {
  return (VISUAL_GROUPS[study.slug] ?? [])
    .filter((group) => group.section === section)
    .map((group) => ({
      ...group,
      visuals: group.files.flatMap((fileName) => {
        const visual = study.visuals?.find((item) => {
          const sources = Array.isArray(item.src) ? item.src : [item.src]
          return sources.some((source) => source.endsWith(fileName))
        })

        return visual ? [visual] : []
      }),
    }))
    .filter((group) => group.visuals.length > 0)
}

function VisualGroups({
  groups,
}: {
  groups: ReturnType<typeof getVisualGroups>
}) {
  if (groups.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.title} className="space-y-3">
          <div className="max-w-3xl space-y-1">
            <h3 className="text-base font-medium text-foreground">
              {group.title}
            </h3>
            <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
              {group.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {group.visuals.map((visual, index) => (
              <CaseStudyVisualFigure
                key={visual.title}
                visual={visual}
                number={String(index + 1).padStart(2, "0")}
                className={
                  visual.width / visual.height >= 1.9 ? "md:col-span-2" : ""
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function getEditorialCaseStudyNavItems(study: CaseStudy, dir: string) {
  return (SECTION_NAV[study.slug] ?? []).map(({ id, ar, en }) => ({
    id,
    label: dir === "rtl" ? ar : en,
  }))
}

export function EditorialCaseStudy({ study }: { study: CaseStudy }) {
  const context = CASE_STUDY_CONTEXT[study.slug]

  if (!context) {
    return null
  }

  return (
    <div className="flex flex-col">
      <Section
        id="overview"
        number="01"
        eyebrow="OVERVIEW"
        title="ملخص المشروع"
        description={study.overview}
      >
        <PanelContent>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["المنتج", study.productType],
              ["القطاع", context.industry],
              ["دوري", study.role],
              [
                "الفترة المسجلة",
                study.period.end
                  ? `${study.period.start} — ${study.period.end}`
                  : study.period.start,
              ],
              ["المنصات", study.platforms.join("، ")],
              ["الحالة", context.status],
              ["الفريق", "تفاصيل التكوين غير موثقة"],
              ["المستخدمون", study.targetAudience.join("، ")],
              ["التعاون", study.collaborationAndDelivery],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 bg-background p-3 sm:p-4">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm/relaxed font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </PanelContent>
      </Section>

      <Section
        id="challenge"
        number="02"
        eyebrow="THE CHALLENGE"
        title="المشكلة وسياقها"
        description={study.challenge}
      >
        <PanelContent className="grid gap-3 sm:grid-cols-2">
          <section className="min-w-0 border border-line bg-surface/30 p-4">
            <h3 className="text-sm font-medium text-foreground">لماذا تهم؟</h3>
            <p className="mt-2 text-sm/relaxed text-muted-foreground">
              {study.businessImpact}
            </p>
          </section>
          <section className="min-w-0 border border-line bg-surface/30 p-4">
            <h3 className="text-sm font-medium text-foreground">من يتأثر؟</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {study.targetAudience.map((audience) => (
                <li
                  key={audience}
                  className="max-w-full border border-line px-2 py-1 text-xs text-muted-foreground"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </section>
        </PanelContent>
      </Section>

      <Section
        id="role"
        number="03"
        eyebrow="MY ROLE"
        title="مسؤوليتي ومساهمتي"
        description={`الدور المسجل في المشروع: ${study.role}.`}
      >
        <PanelContent className="space-y-4">
          <ul className="grid gap-2 sm:grid-cols-2">
            {context.role.map((responsibility, index) => (
              <li
                key={responsibility}
                className="flex min-w-0 items-start gap-3 border border-line bg-surface/30 p-3"
              >
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm/relaxed text-muted-foreground">
                  {responsibility}
                </span>
              </li>
            ))}
          </ul>
          <p className="border-s-2 border-primary ps-3 text-xs/relaxed text-muted-foreground">
            تنفيذ التطوير والجودة تم بالتعاون مع الفرق المذكورة في سجل المشروع؛
            لا تُنسب أعمال الفريق كاملةً إلى دوري الفردي.
          </p>
        </PanelContent>
      </Section>

      <Section
        id="discovery"
        number="04"
        eyebrow="DISCOVERY"
        title="الاكتشاف وتعريف المشكلة"
        description={study.problemUnderstanding}
      >
        <PanelContent className="space-y-3">
          {study.uxProcess.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                مراحل العمل المسجلة
              </h3>
              <ol className="grid gap-3 sm:grid-cols-2">
                {study.uxProcess.map((step, index) => (
                  <li
                    key={step}
                    className="flex min-w-0 items-start gap-3 border-s border-line ps-3"
                  >
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm/relaxed text-muted-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <ul className="grid gap-2 sm:grid-cols-2">
            {context.discovery.map((evidence) => (
              <li
                key={evidence}
                className="min-w-0 border border-line bg-surface/30 p-3 text-sm/relaxed text-muted-foreground"
              >
                {evidence}
              </li>
            ))}
          </ul>
          <p className="text-xs/relaxed text-muted-foreground">
            <span className="font-medium text-foreground">حدود الأدلة: </span>
            {context.researchLimit}
          </p>
          <VisualGroups groups={getVisualGroups(study, "discovery")} />
        </PanelContent>
      </Section>

      <Section
        id="strategy"
        number="05"
        eyebrow="STRATEGY & DECISIONS"
        title="الاستراتيجية وقرارات التصميم"
        description={study.designSolution}
      >
        <PanelContent className="space-y-4">
          <ol className="grid gap-2 sm:grid-cols-2">
            {(study.redesignStrategy ?? []).map((decision, index) => (
              <li
                key={decision}
                className="flex min-w-0 items-start gap-3 border border-line bg-surface/30 p-3"
              >
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm/relaxed text-muted-foreground">
                  {decision}
                </span>
              </li>
            ))}
          </ol>
          {study.uxImprovements && study.uxImprovements.length > 0 && (
            <div className="divide-y divide-line border-y border-line">
              {study.uxImprovements.map((decision) => (
                <section
                  key={decision.title}
                  className="grid gap-2 py-3 sm:grid-cols-2"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground">
                      {decision.title}
                    </h3>
                    <p className="mt-1 text-xs/relaxed text-muted-foreground">
                      {decision.problem}
                    </p>
                  </div>
                  <div className="min-w-0 border-s border-line ps-3">
                    <p className="text-xs font-medium text-foreground">
                      القرار
                    </p>
                    <p className="mt-1 text-xs/relaxed text-muted-foreground">
                      {decision.decision}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          )}
          <VisualGroups groups={getVisualGroups(study, "strategy")} />
        </PanelContent>
      </Section>

      <Section
        id="experience"
        number="06"
        eyebrow="UX & WORKFLOWS"
        title="التجربة ومسارات الاستخدام"
        description={context.journeyTitle}
      >
        <PanelContent className="space-y-5">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {context.journey.map((step, index) => (
              <li
                key={step}
                className="min-w-0 border border-line bg-surface/30 p-3"
              >
                <p className="mb-2 font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-sm/relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>
          <p className="text-xs/relaxed text-muted-foreground">
            التدفق يلخص تجربة المنتج الموصوفة في بيانات المشروع، ولا يمثل وحده
            دليلًا على نتيجة تشغيلية أو قياس سلوكي.
          </p>
          {study.keyFlowsAndFeatures.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {study.keyFlowsAndFeatures.map((flow) => (
                <section
                  key={flow.title}
                  className="min-w-0 border border-line p-3"
                >
                  <h3 className="text-sm font-medium text-foreground">
                    {flow.title}
                  </h3>
                  <p className="mt-1 text-xs/relaxed text-muted-foreground">
                    {flow.description}
                  </p>
                </section>
              ))}
            </div>
          )}
          {study.visuals && study.visuals.length > 0 ? (
            <VisualGroups groups={getVisualGroups(study, "experience")} />
          ) : (
            <p className="border-s-2 border-primary ps-3 text-xs/relaxed text-muted-foreground">
              لا تتوفر لقطات أصلية لواجهات المنتج ضمن ملفات الحالة؛ لذلك لا أعرض
              الرسم التوضيحي المتاح كواجهة أو كتدفق استخدام موثق.
            </p>
          )}
        </PanelContent>
      </Section>

      <Section
        id="delivery"
        number="07"
        eyebrow="DELIVERY"
        title="المخرجات والتعاون"
        description={study.collaborationAndDelivery}
      >
        <PanelContent className="space-y-3">
          <ul className="grid gap-2 sm:grid-cols-2">
            {study.outcomesAndLearnings.map((item) => (
              <li
                key={item}
                className="min-w-0 border border-line bg-surface/30 p-3 text-sm/relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs/relaxed text-muted-foreground">
            {context.deliveryLimit}
          </p>
        </PanelContent>
      </Section>

      <Section
        id="outcome"
        number="08"
        eyebrow="OUTCOME & REFLECTION"
        title="الأثر وما يحتاج إلى استكمال"
        description="أميز بين ما توثقه المواد المتاحة وما لا يمكن ادعاؤه من دون بيانات إضافية."
      >
        <PanelContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["الموثق", context.status],
              [
                "الأثر المقاس",
                "لا تتوفر مؤشرات أداء أو نتائج اختبار موثقة في المواد الحالية.",
              ],
            ].map(([label, value]) => (
              <section key={label} className="min-w-0 border border-line p-3">
                <h3 className="text-xs font-medium text-foreground">{label}</h3>
                <p className="mt-1 text-sm/relaxed text-muted-foreground">
                  {value}
                </p>
              </section>
            ))}
          </div>
          <div className="border-t border-dashed border-line pt-3">
            <h3 className="mb-2 text-sm font-medium text-foreground">
              معلومات لاستكمال التوثيق
            </h3>
            <ul className="grid gap-2 text-xs/relaxed text-muted-foreground sm:grid-cols-2">
              <li>حدود دوري الفردي ومخرجات الفريق التي سُلّمت أو أُطلقت.</li>
              <li>أدلة البحث أو الاختبار: المنهج والعينة والنتائج.</li>
              <li>حالة المنتج والإصدارات المرتبطة بالتصميم المعروض.</li>
              <li>قياسات الأثر ومصدر البيانات، إن توفرت.</li>
            </ul>
          </div>
        </PanelContent>
      </Section>
    </div>
  )
}
