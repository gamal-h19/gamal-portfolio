import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { CaseStudyVisualFigure } from "@/features/portfolio/components/projects/case-study-visual"
import type { CaseStudy } from "@/features/portfolio/data/case-studies"

const challengeAreas = [
  {
    title: "المواعيد والاستقبال",
    problem: "تداخل المواعيد مع قائمة الانتظار يصعّب متابعة الحالة التالية.",
    impact:
      "قد يتأخر انتقال الحالة بين الاستقبال والفحص أو تضيع حالة المتابعة.",
  },
  {
    title: "السجلات الطبية",
    problem: "توزع تفاصيل الزيارة وخطة العلاج وملاحظات الطبيب.",
    impact: "يحتاج الفريق إلى سياق واضح قبل متابعة الحالة أو تسليمها.",
  },
  {
    title: "المخزون والأدوية",
    problem: "تتطلب الكميات والصلاحية وحركات الصرف متابعة مترابطة.",
    impact: "ضعف وضوح المخزون قد يصعّب قرار الصرف أو إعادة الطلب.",
  },
  {
    title: "المشتريات والمبيعات",
    problem: "الموردون وعمليات البيع والمدفوعات جزء من التشغيل اليومي.",
    impact: "فصل هذه العمليات عن مسار الخدمة يزيد التنقل بين المهام.",
  },
  {
    title: "المهام والصلاحيات",
    problem: "تختلف مسؤوليات الموظفين وما ينبغي لكل دور الوصول إليه.",
    impact: "غياب وضوح الملكية والوصول قد يسبب تداخلًا في العمل.",
  },
]

const mvpInventory = [
  "مستودع واحد في النطاق الأولي",
  "تعريف المنتجات والأدوية والكميات المتاحة",
  "حد أدنى للمخزون وتنبيه عند انخفاض الكمية",
  "تتبع الدفعات وتواريخ الصلاحية",
  "سجل حركات المخزون والضبط والتخلص",
  "قواعد صرف تحد من الصرف غير المناسب",
]

const adjacentModules = [
  {
    name: "الموردون والمشتريات",
    purpose: "ربط احتياج إعادة التزويد بجهات التوريد.",
  },
  {
    name: "نقطة البيع (POS)",
    purpose: "دعم تسجيل واحتساب معاملات الخدمات والمنتجات.",
  },
  {
    name: "المهام",
    purpose: "توضيح المسؤول عن المتابعة والخطوة التشغيلية التالية.",
  },
  {
    name: "الأدوار والفروع (RBAC)",
    purpose: "تنظيم الوصول وتعيين العمل بحسب دور المستخدم والفرع.",
  },
]

const workflowSteps = [
  {
    title: "الموعد أو الوصول",
    detail: "بدء الحالة من موعد أو تسجيل استقبال.",
  },
  {
    title: "قائمة الانتظار",
    detail: "إظهار الحالة وموقعها في مسار العيادة.",
  },
  {
    title: "الفحص والسجل",
    detail: "الانتقال إلى تفاصيل الزيارة وملاحظات الطبيب.",
  },
  {
    title: "الإجراء التالي",
    detail: "متابعة العلاج أو الصرف أو إغلاق الزيارة.",
  },
]

const inventorySteps = [
  "المنتج أو الدواء",
  "الدفعة والكمية والصلاحية",
  "حركة موثقة للمخزون",
  "صرف مضبوط أو تعديل أو تخلص",
]

type EliteVetScreen = Omit<NonNullable<CaseStudy["visuals"]>[number], "src"> & {
  src: string
}

function getSelectedScreens(study: CaseStudy): EliteVetScreen[] {
  return (study.visuals ?? []).flatMap((visual) => {
    const sources = Array.isArray(visual.src) ? visual.src : [visual.src]

    return sources.map((src) => ({ ...visual, src }))
  })
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <PanelHeader className="space-y-2">
      <p className="font-mono text-xs text-primary">{eyebrow}</p>
      <PanelTitle className="text-xl tracking-normal sm:text-2xl">
        {title}
      </PanelTitle>
      {children && (
        <p className="max-w-3xl text-sm/relaxed text-muted-foreground">
          {children}
        </p>
      )}
    </PanelHeader>
  )
}

function WorkflowDiagram({
  steps,
  label,
}: {
  steps: { title: string; detail: string }[]
  label: string
}) {
  return (
    <ol
      aria-label={label}
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      dir="rtl"
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative min-w-0 border border-line bg-surface/30 p-3"
        >
          <p className="mb-2 font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
          <p className="mt-1 text-xs/relaxed text-muted-foreground">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScreenFigure({
  screen,
  priority = false,
}: {
  screen: EliteVetScreen
  priority?: boolean
}) {
  return <CaseStudyVisualFigure visual={screen} priority={priority} />
}

export function EliteVetCaseStudy({ study }: { study: CaseStudy }) {
  const selectedScreens = getSelectedScreens(study)

  return (
    <div className="flex flex-col">
      <Panel
        id="overview"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading eyebrow="01 / OVERVIEW" title="ملخص المشروع">
          بناء تصور لمنصة SaaS تربط عمليات العيادة البيطرية اليومية. قُدت اكتشاف
          المنتج وتحديد أولوياته وتصميم تجربة الاستخدام، مع تنسيق العمل مع فريق
          التطوير؛ ولا تتوفر بيانات موثقة عن الإطلاق أو الأثر المقاس.
        </SectionHeading>
        <PanelContent>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["نوع المنتج", study.productType],
              ["المجال", "إدارة العيادات البيطرية"],
              ["دوري", "Product Manager & UX Lead"],
              [
                "الفترة المتاحة",
                `${study.period.start} — ${study.period.end ?? "غير محددة"}`,
              ],
              ["المنصات", study.platforms.join("، ")],
              ["حالة المشروع", "غير موثقة في المواد المتاحة"],
              ["الفريق", "تفاصيل التكوين غير موثقة"],
              ["نوع التعاون", "تعاون مع فريق التطوير وأصحاب المصلحة"],
              ["الملخص", "اكتشاف المنتج، تحديد MVP، تصميم المتطلبات والتدفقات"],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 bg-background p-3 sm:p-4">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm/relaxed font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4">
            <ScreenFigure screen={selectedScreens[0]} priority />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.targetAudience.map((audience) => (
              <span
                key={audience}
                className="max-w-full border border-line px-2 py-1 text-xs text-muted-foreground"
              >
                {audience}
              </span>
            ))}
          </div>
        </PanelContent>
      </Panel>

      <Panel
        id="challenge"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading eyebrow="02 / THE CHALLENGE" title="التحدي التشغيلي">
          التحدي لم يكن إضافة شاشات منفصلة، بل تنظيم نقاط تسليم العمل بين
          الاستقبال والطبيب والمخزون والإدارة، من دون افتراض نتائج كمية غير
          متاحة.
        </SectionHeading>
        <PanelContent className="grid gap-2 sm:grid-cols-2">
          {challengeAreas.map((area) => (
            <section
              key={area.title}
              className="min-w-0 border border-line bg-surface/30 p-4"
            >
              <h3 className="text-sm font-medium text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-xs/relaxed text-muted-foreground">
                <span className="font-medium text-foreground">المشكلة: </span>
                {area.problem}
              </p>
              <p className="mt-2 text-xs/relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  الأثر التشغيلي:{" "}
                </span>
                {area.impact}
              </p>
            </section>
          ))}
          <p className="border-s-2 border-primary p-3 text-xs/relaxed text-muted-foreground sm:col-span-2">
            قيد النطاق الواضح في المواد: البدء بمستودع واحد، مع بناء تجربة ويب
            تخدم أدوارًا مختلفة. لا تتوفر تفاصيل موثقة عن قيود تقنية أو تنظيمية
            أخرى.
          </p>
        </PanelContent>
      </Panel>

      <Panel
        id="role"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading eyebrow="03 / MY ROLE" title="دوري ومسؤولياتي">
          دوري المعلن Product Manager & UX Lead. امتلكت قيادة نطاق المنتج
          والتجربة، مع التنسيق مع فريق التطوير؛ لا أنسب تنفيذ المنتج كاملًا إلى
          شخص واحد.
        </SectionHeading>
        <PanelContent className="grid gap-3 md:grid-cols-2">
          <section className="border border-line p-4">
            <h3 className="mb-3 text-sm font-medium text-foreground">
              ما قدته ضمن دوري
            </h3>
            <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
              <li>اكتشاف احتياجات المنتج ومراجعة سير عمل العيادة.</li>
              <li>
                صياغة المشكلة وتحديد نطاق MVP وترتيب الأولويات بإطار RICE.
              </li>
              <li>
                إعداد تدفقات المستخدم، السيناريوهات، قواعد العمل والحالات
                الطرفية.
              </li>
              <li>كتابة User Stories وAcceptance Criteria ومتطلبات المنتج.</li>
              <li>
                قيادة قرارات UX وتصميم مسارات الاستقبال والمخزون والعمليات.
              </li>
              <li>
                إدارة الأولويات والـ backlog والتنسيق حول تخطيط الـ sprints.
              </li>
            </ul>
          </section>
          <section className="border border-line p-4">
            <h3 className="mb-3 text-sm font-medium text-foreground">
              التعاون والتنفيذ
            </h3>
            <p className="text-sm/relaxed text-muted-foreground">
              نُسقت المتطلبات والتصميم مع فريق التطوير وأصحاب المصلحة، ورُوجعت
              حالات الاستخدام ومسارات العمل معهم. تفاصيل أعضاء الفريق وتقسيم
              المسؤوليات التنفيذية غير موثقة؛ لذلك لا أصف هذه الدراسة كعمل فردي
              يشمل التطوير البرمجي.
            </p>
          </section>
        </PanelContent>
      </Panel>

      <Panel
        id="discovery"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading
          eyebrow="04 / DISCOVERY"
          title="اكتشاف المنتج وتعريف المشكلة"
        >
          اعتمد تأطير المشكلة على مراجعة سير العمل والمتطلبات وحالات الاستخدام
          المتاحة، لا على نتائج بحث كمي أو مقابلات غير موثقة.
        </SectionHeading>
        <PanelContent className="space-y-4">
          {study.process && study.process.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">
                مراحل العمل المسجلة
              </h3>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {study.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex min-w-0 items-start gap-3 border-s border-line ps-3"
                  >
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {step.title}
                      </p>
                      <p className="text-xs/relaxed text-muted-foreground">
                        {step.phase}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              {
                label: "ما هو موثق",
                text: "مراجعة سير عمل العيادة، وتحليل المتطلبات وحالات الاستخدام مع الأطراف المعنية.",
              },
              {
                label: "صياغة المشكلة",
                text: "تشتت تدفقات المواعيد والسجلات والمخزون يرفع عبء التنسيق بين أدوار الفريق.",
              },
              {
                label: "الاستنتاج التصميمي",
                text: "تحتاج المهام اليومية إلى حالات واضحة وتسليم منظم للمعلومة بين الأدوار.",
              },
            ].map((item) => (
              <section
                key={item.label}
                className="min-w-0 border border-line bg-surface/30 p-3"
              >
                <h3 className="text-xs font-medium text-foreground">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs/relaxed text-muted-foreground">
                  {item.text}
                </p>
              </section>
            ))}
          </div>
          <p className="border-t border-dashed border-line pt-3 text-xs/relaxed text-muted-foreground">
            <span className="font-medium text-foreground">حدود الأدلة: </span>
            ملف المشروع لا يحدد عدد المشاركين أو أساليب المقابلات أو بيانات
            التحليلات أو نتائج اختبار قابلية الاستخدام. لذا تُعرض النقاط أعلاه
            بوصفها تأطيرًا للمنتج، لا نتائج بحث ميداني مثبتة.
          </p>
        </PanelContent>
      </Panel>

      <Panel
        id="mvp-strategy"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading
          eyebrow="05 / PRODUCT STRATEGY"
          title="الاستراتيجية ونطاق MVP"
        >
          استُخدم RICE (Reach × Impact × Confidence ÷ Effort) لموازنة الوصول
          والأثر والثقة والجهد. لا تتوفر درجات أو تقديرات أصلية، لذلك لا أضيف
          أرقامًا أو ترتيبًا رقميًا بأثر رجعي.
        </SectionHeading>
        <PanelContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Reach", "كم مستخدمًا أو تدفقًا يتأثر؟"],
              ["Impact", "ما أثر التحسين على المهمة التشغيلية؟"],
              ["Confidence", "ما مقدار الأدلة التي تسند التقدير؟"],
              ["Effort", "ما الجهد التقريبي للتصميم والتطوير؟"],
            ].map(([term, definition]) => (
              <div key={term} className="border border-line p-3">
                <p className="font-mono text-xs text-primary">{term}</p>
                <p className="mt-2 text-xs/relaxed text-muted-foreground">
                  {definition}
                </p>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-medium text-foreground">
            نطاق العمل الذي تدعمه المواد
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <section className="border border-line bg-surface/30 p-4">
              <p className="mb-2 text-xs font-medium text-primary">
                أساسيات MVP
              </p>
              <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                <li>مواعيد واستقبال وقائمة انتظار لتنسيق رحلة الزيارة.</li>
                <li>مخزون أولي بمستودع واحد وتتبع الأدوية والدفعات.</li>
                <li>السجلات الطبية والعمليات الأساسية المرتبطة بالزيارة.</li>
              </ul>
            </section>
            <section className="border border-line bg-surface/30 p-4">
              <p className="mb-2 text-xs font-medium text-primary">
                ما يحتاج تثبيتًا قبل اعتباره MVP
              </p>
              <p className="text-sm/relaxed text-muted-foreground">
                الموردون وPOS والمهام وRBAC ظاهرة ضمن وحدات المنتج، لكن المواد
                لا تحدد بدقة أيها دخل الإصدار الأول أو ما الذي أُجل. التوسع إلى
                عدة مستودعات أو الفروع المتقدمة فرص لاحقة محتملة، لا التزام
                تسليم موثق.
              </p>
            </section>
          </div>
          <p className="text-xs/relaxed text-muted-foreground">
            منطق الأولوية: البدء بالتدفقات المتكررة التي تربط استقبال الحالة
            وتقديم الخدمة وسلامة متابعة الأدوية، ثم توسيع الوحدات وفق أثرها
            وجهدها وثقة الفريق في التقدير.
          </p>
        </PanelContent>
      </Panel>

      <Panel
        id="product-decisions"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading eyebrow="06 / PRODUCT DECISIONS" title="قرارات المنتج">
          تُظهر القرارات كيف تحوّل نطاق المنصة إلى قواعد تشغيل قابلة للنقاش مع
          الفريق، مع فصل ما ورد عن فرص التوسع التي لم تثبت.
        </SectionHeading>
        <PanelContent className="space-y-5">
          <section className="space-y-3">
            <div>
              <h3 className="text-base font-medium text-foreground">
                إدارة المخزون والأدوية
              </h3>
              <p className="mt-1 text-xs/relaxed text-muted-foreground">
                قيد MVP هو مستودع واحد. يحد ذلك من تعقيد التتبع في البداية،
                ويتيح التركيز على دقة حركة المنتج والدواء.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {mvpInventory.map((item, index) => (
                <li
                  key={item}
                  className="flex min-w-0 items-start gap-2 border border-line p-3 text-xs/relaxed text-muted-foreground"
                >
                  <span className="font-mono text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="border-s-2 border-primary ps-3 text-xs/relaxed text-muted-foreground">
              قواعد الحد الأدنى والتنبيه والصرف والتخلص مذكورة كمجالات قرار؛
              القيم الرقمية، صلاحيات اعتماد التعديل، والقيود التفصيلية غير
              متاحة، فلا تُعرض كقواعد منفذة بعينها.
            </p>
          </section>

          <section className="space-y-3 border-t border-dashed border-line pt-4">
            <h3 className="text-base font-medium text-foreground">
              المواعيد والاستقبال
            </h3>
            <p className="text-sm/relaxed text-muted-foreground">
              نقطة القرار هي ربط الموعد بوصول الحالة وقائمة الانتظار وحالة
              الزيارة، بحيث يتضح للفريق أين توجد الحالة وما الخطوة التالية. هذا
              تنظيم للتدفق المعروض، وليس ادعاءً بوقت انتظار أقل أو تحسن مقاس.
            </p>
          </section>

          <section className="space-y-3 border-t border-dashed border-line pt-4">
            <h3 className="text-base font-medium text-foreground">
              الوحدات التشغيلية الأخرى
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {adjacentModules.map((module) => (
                <div
                  key={module.name}
                  className="min-w-0 border border-line bg-surface/30 p-3"
                >
                  <h4 className="text-sm font-medium text-foreground">
                    {module.name}
                  </h4>
                  <p className="mt-1 text-xs/relaxed text-muted-foreground">
                    {module.purpose}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <ScreenFigure screen={selectedScreens[5]} />
              <ScreenFigure screen={selectedScreens[6]} />
              <ScreenFigure screen={selectedScreens[7]} />
              <ScreenFigure screen={selectedScreens[11]} />
              <ScreenFigure screen={selectedScreens[12]} />
            </div>
            <p className="text-xs/relaxed text-muted-foreground">
              الأدوار وربطها بالفروع جزء من الصورة المنتجية؛ لا تتوفر مصفوفة
              صلاحيات أو تفاصيل اعتماد/إطلاق هذه الوحدات.
            </p>
          </section>
        </PanelContent>
      </Panel>

      <Panel
        id="workflows"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading
          eyebrow="07 / UX & WORKFLOWS"
          title="تصميم التجربة ومسارات العمل"
        >
          اخترت لقطات محدودة تشرح الاستقبال والسجلات والتحصيل. الصور مواد
          تصميمية متاحة؛ لا تكفي وحدها لإثبات أن الشاشات أُطلقت للمستخدمين.
        </SectionHeading>
        <PanelContent className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              من الموعد إلى متابعة الزيارة
            </h3>
            <p className="text-xs/relaxed text-muted-foreground">
              المستخدمون: الاستقبال والطبيب. يركز التدفق على وضوح انتقال الحالة
              من الوصول إلى الفحص ثم الإجراء التالي؛ تفاصيل العملية السابقة غير
              موثقة بما يكفي لمقارنة Before/After.
            </p>
            <WorkflowDiagram
              label="تدفق الموعد والاستقبال"
              steps={workflowSteps}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <ScreenFigure screen={selectedScreens[1]} />
              <ScreenFigure screen={selectedScreens[8]} />
              <ScreenFigure screen={selectedScreens[9]} />
              <ScreenFigure screen={selectedScreens[2]} />
              <ScreenFigure screen={selectedScreens[3]} />
            </div>
          </section>

          <section className="space-y-3 border-t border-dashed border-line pt-5">
            <h3 className="text-sm font-medium text-foreground">
              من تعريف الدواء إلى حركة المخزون
            </h3>
            <p className="text-xs/relaxed text-muted-foreground">
              المستخدم المستهدف: مسؤول المخزون أو عضو الفريق المخول. يربط التدفق
              بيانات المنتج والدفعة بحركة قابلة للمراجعة، مع التنبيه إلى أن
              قواعد الصرف التفصيلية تحتاج توثيقًا.
            </p>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {inventorySteps.map((step, index) => (
                <li
                  key={step}
                  className="min-w-0 border border-line bg-surface/30 p-3"
                >
                  <p className="mb-2 font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-xs/relaxed text-foreground">{step}</p>
                </li>
              ))}
            </ol>
            <p className="border-s-2 border-primary ps-3 text-xs/relaxed text-muted-foreground">
              لم أعثر ضمن الأصول المتاحة على لقطة واجهة مخصصة للمخزون؛ لذلك يشرح
              هذا القسم نطاق القرار دون إسناد وظائف المخزون إلى شاشة أخرى.
            </p>
          </section>

          <section className="space-y-3 border-t border-dashed border-line pt-5">
            <h3 className="text-sm font-medium text-foreground">
              ربط تقديم الخدمة بالتحصيل
            </h3>
            <p className="text-xs/relaxed text-muted-foreground">
              تظهر أهمية نقطة البيع بعد توثيق الخدمة؛ وضعها بجوار سير الزيارة
              يوضح علاقتها بالعمليات بدل عرضها كوحدة معزولة.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <ScreenFigure screen={selectedScreens[10]} />
              <ScreenFigure screen={selectedScreens[4]} />
            </div>
          </section>
        </PanelContent>
      </Panel>

      <Panel
        id="delivery"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading
          eyebrow="08 / PRODUCT DELIVERY"
          title="من القرار إلى مخرجات المنتج"
        >
          ربطت إدارة المنتج بين فهم التدفقات وما يحتاجه فريق التطوير للتنفيذ
          والمراجعة، دون ادعاء اكتمال التسليم البرمجي.
        </SectionHeading>
        <PanelContent>
          <WorkflowDiagram
            label="مخرجات العمل من الاكتشاف إلى التطوير"
            steps={[
              {
                title: "تعريف المشكلة",
                detail: "تحديد المستخدم وسياق المهمة والقيود.",
              },
              {
                title: "نطاق المتطلبات",
                detail: "توضيح القواعد والسيناريوهات والحالات الطرفية.",
              },
              {
                title: "التصميم والتوثيق",
                detail: "تجهيز التدفقات والواجهات وUser Stories.",
              },
              {
                title: "التنسيق مع التطوير",
                detail: "مراجعة الأولويات ومعايير القبول والـ backlog.",
              },
            ]}
          />
          <p className="mt-4 text-sm/relaxed text-muted-foreground">
            شملت المخرجات الموثقة متطلبات المنتج، User Flows، قواعد العمل، User
            Stories، Acceptance Criteria، وتصميمات وتجارب للعمليات الأساسية.
            حالة تنفيذ كل مخرج وتسليمه النهائي تحتاج إلى تأكيد.
          </p>
        </PanelContent>
      </Panel>

      <Panel
        id="outcome-reflection"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <SectionHeading
          eyebrow="09 / OUTCOME & REFLECTION"
          title="المخرجات والأثر والتعلّم"
        >
          أفصل هنا بين ما تشير إليه مواد المشروع وما لا يمكن إثباته حاليًا.
        </SectionHeading>
        <PanelContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              {
                title: "ما تم تحديده وتصميمه",
                text: "نطاق منصة لإدارة العيادة، تدفقات الاستقبال والمخزون، متطلبات المنتج وواجهات تشغيلية.",
              },
              {
                title: "ما تم تطويره أو إطلاقه",
                text: "غير موثق بما يكفي في المواد المتاحة، ويحتاج إلى تأكيد.",
              },
              {
                title: "ما تم قياسه",
                text: "لا توجد نتائج أداء أو اختبارات موثقة يمكن نسبتها إلى المشروع.",
              },
              {
                title: "فرص لاحقة",
                text: "توسيع إدارة الفروع والمستودعات، وتأكيد أتمتة الشراء والتقارير بعد تثبيت نطاق الإصدار الأول.",
              },
            ].map((item) => (
              <section
                key={item.title}
                className="min-w-0 border border-line bg-surface/30 p-4"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm/relaxed text-muted-foreground">
                  {item.text}
                </p>
              </section>
            ))}
          </div>
          <div className="border-s-2 border-primary ps-4">
            <h3 className="text-sm font-medium text-foreground">ما تعلمته</h3>
            <p className="mt-1 text-sm/relaxed text-muted-foreground">
              في الأنظمة التشغيلية، يعتمد وضوح التجربة على وضوح قواعد العمل
              وتسليم المسؤولية بقدر اعتماده على الواجهة. كنت سأوثق درجات RICE
              ومعايير نجاح MVP ونتائج التحقق مبكرًا حتى يصبح أثر القرارات قابلًا
              للمراجعة بعد التنفيذ.
            </p>
          </div>
          <div className="border-t border-dashed border-line pt-4">
            <h3 className="mb-3 text-sm font-medium text-foreground">
              معلومات تحتاج تأكيدًا لاستكمال الدراسة
            </h3>
            <ul className="grid gap-2 text-xs/relaxed text-muted-foreground sm:grid-cols-2">
              <li>حالة المشروع الفعلية وما الذي أُطلق أو سُلّم.</li>
              <li>الفريق وأدواره ومدة التعاون.</li>
              <li>أساليب البحث والمشاركون والأدلة التي جُمعت.</li>
              <li>درجات RICE ومعايير قرار نطاق MVP.</li>
              <li>اختبارات الاستخدام والتغييرات الناتجة عنها.</li>
              <li>نتائج الأداء ومصدر بيانات القياس، إن وجدت.</li>
            </ul>
          </div>
        </PanelContent>
      </Panel>
    </div>
  )
}
