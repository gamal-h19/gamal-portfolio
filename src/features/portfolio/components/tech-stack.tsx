import { TECH_STACK } from "../data/tech-stack"
import type { TechStack as TechStackType } from "../types/tech-stack"
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "./panel"

const ID = "stack"

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  "UX & Research": "بحث المستخدم وتصميم التجربة",
  "Product Management": "إدارة واستراتيجية المنتجات",
  "Data & Growth": "تحليلات المنتج والنمو",
  "AI & Systems": "الذكاء الاصطناعي والأنظمة",
  Tools: "الأدوات",
  Methods: "الأطر وأساليب العمل",
}

const ITEM_TRANSLATIONS: Record<string, string> = {
  "user-research": "أبحاث المستخدمين",
  "customer-journey": "رحلة المستخدم",
  "info-architecture": "تنظيم المعلومات",
  "usability-testing": "اختبار الاستخدام",
  "sus-evaluation": "قياس سهولة الاستخدام",
  "heuristic-evaluation": "التقييم الإرشادي",
  "service-design": "تصميم الخدمات",
  "ux-audit": "مراجعة التجربة",
  "ux-writing": "كتابة الواجهات",
  "design-reviews": "مراجعة التصميم",
  "product-discovery": "استكشاف المنتج",
  "problem-framing": "تحديد المشكلة",
  "opportunity-assessment": "تحليل الفرص",
  "rice-prioritization": "ترتيب الأولويات",
  "product-roadmapping": "خارطة الطريق",
  "backlog-management": "إدارة المهام",
  "user-stories": "قصص المستخدم والقبول",
  "mvp-definition": "تحديد الإصدار الأول",
  "sprint-planning": "تخطيط دورات العمل",
  "stakeholder-alignment": "مواءمة الأطراف",
  "heart-framework": "قياس تجربة المستخدم",
  "aarrr-framework": "مراحل نمو المستخدم",
  "product-lifecycle": "دورة حياة المنتج",
  "nps-csat": "رضا المستخدمين",
  "funnel-analysis": "مسار الاستخدام",
  cro: "تحسين التحويل",
  plg: "نمو المنتج",
  "churn-analysis": "فقدان العملاء",
  "prompt-engineering": "كتابة أوامر الذكاء الاصطناعي",
  "ai-workflows": "مسارات الذكاء الاصطناعي",
  figma: "فيجما",
  figjam: "فيج جام",
  miro: "ميرو",
  "google-analytics": "تحليلات جوجل",
  hotjar: "هوتجار",
  notion: "نوشن",
  maze: "مايز",
  jira: "جيرا",
  asana: "أسانا",
  excel: "إكسل",
  agile: "العمل المرن",
  scrum: "إدارة دورات العمل",
  "design-sprint": "سباق التصميم",
  "lean-ux": "التصميم المرن",
  "build-measure-learn": "ابنِ، قِس، تعلّم",
  "design-thinking": "التفكير التصميمي",
}

export function TechStack() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>خبراتي وأدواتي</a>
        </PanelTitle>
        <PanelDescription>
          مهارات وأساليب أستخدمها لفهم احتياجات الناس وتطوير منتجات أفضل.
        </PanelDescription>
      </PanelHeader>

      <div className="relative [--badge-height:--spacing(6)] [--col-left-width:--spacing(48)]">
        <div
          className="pointer-events-none absolute inset-y-0 inset-s-(--col-left-width) -z-1 w-px border-r border-dashed border-line max-sm:hidden"
          aria-hidden
        />

        {Object.entries(groupByCategory(TECH_STACK)).map(
          ([category, items], index) => {
            const categoryId = `${ID}-${category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`

            const localizedCategory =
              CATEGORY_TRANSLATIONS[category] || category

            return (
              <div
                key={category}
                className="grid items-start gap-y-2 border-b border-line py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
              >
                <div
                  id={categoryId}
                  className="px-4 text-sm/(--badge-height) font-medium"
                >
                  <span
                    className="mx-1.5 font-mono text-muted-foreground/80 select-none"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {localizedCategory}
                </div>

                <ul
                  aria-labelledby={categoryId}
                  className="flex flex-wrap gap-1.5 px-4"
                >
                  {items.map((item) => {
                    return (
                      <li key={item.key} className="flex">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener"
                          className="flex h-(--badge-height) items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-sans text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground/80"
                        >
                          {item.icon}
                          {ITEM_TRANSLATIONS[item.key] ?? item.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }
        )}
      </div>
    </Panel>
  )
}

function groupByCategory(
  items: TechStackType[]
): Record<string, TechStackType[]> {
  return items.reduce<Record<string, TechStackType[]>>((acc, item) => {
    for (const category of item.categories) {
      ;(acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
