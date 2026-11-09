"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
} from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { AppLink } from "@/components/app-link"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { CaseStudyImage } from "@/features/portfolio/components/projects/case-study-image"
import { CaseStudyVisualFigure } from "@/features/portfolio/components/projects/case-study-visual"
import {
  EditorialCaseStudy,
  getEditorialCaseStudyNavItems,
} from "@/features/portfolio/components/projects/editorial-case-study"
import { EliteVetCaseStudy } from "@/features/portfolio/components/projects/elitevet-case-study"
import type { CaseStudy } from "@/features/portfolio/data/case-studies"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

const SUCCESS_METRICS: Record<string, string[]> = {
  "ynmo-daycare": [
    "زمن تسجيل الحضور",
    "اكتمال السجلات اليومية",
    "تفاعل الأسرة مع التقارير",
  ],
  "ynmo-tifli": [
    "اكتمال تحديثات النمو",
    "وضوح تقدم الطفل",
    "تفاعل الأسرة مع التقارير",
  ],
  elitevet: [
    "زمن إنجاز الإجراءات",
    "دقة سجلات المخزون",
    "إتمام المهام التشغيلية",
  ],
  daawa: [
    "إكمال تهيئة الموكل",
    "سرعة الوصول لمستجدات القضية",
    "استخدام المساعد القانوني",
  ],
}

const CASE_STUDY_NAV_ITEMS = [
  {
    id: "business-challenge",
    title: { ar: "المشكلة", en: "Objective" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(
        study.overview ||
        study.challenge ||
        study.businessImpact ||
        study.problemUnderstanding
      ),
  },
  {
    id: "redesign-strategy",
    title: { ar: "استراتيجية التصميم", en: "Approach" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(study.redesignStrategy?.length),
  },
  {
    id: "product-screens",
    title: { ar: "المنتج", en: "UX Research" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(study.visuals?.length || study.keyFlowsAndFeatures?.length),
  },
  {
    id: "ux-improvements",
    title: { ar: "قرارات التصميم", en: "Branding" },
    shouldInclude: (study: CaseStudy) => Boolean(study.uxImprovements?.length),
  },
  {
    id: "role-and-ownership",
    title: { ar: "الدور", en: "Execution" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(
        study.role || study.collaborationAndDelivery || study.uxProcess?.length
      ),
  },
  {
    id: "product-impact",
    title: { ar: "الأثر", en: "Impact" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(study.businessImpact || study.outcomesAndLearnings?.length),
  },
  {
    id: "audience",
    title: { ar: "المستخدمون", en: "Audience" },
    shouldInclude: (study: CaseStudy) => Boolean(study.targetAudience?.length),
  },
  {
    id: "challenge",
    title: { ar: "التحدي", en: "Challenge" },
    shouldInclude: (study: CaseStudy) => Boolean(study.challenge),
  },
  {
    id: "problem-framing",
    title: { ar: "فهم المشكلة", en: "Problem" },
    shouldInclude: (study: CaseStudy) =>
      Boolean(
        study.problemDefinition ||
        study.problemUnderstanding ||
        study.researchInsights?.length
      ),
  },
] as const

function getCaseStudyNavItems(study: CaseStudy, dir: string) {
  const locale = dir === "rtl" ? "ar" : "en"

  if (study.slug === "elitevet") {
    return [
      { id: "overview", label: locale === "ar" ? "الملخص" : "Overview" },
      { id: "challenge", label: locale === "ar" ? "التحدي" : "Challenge" },
      { id: "role", label: locale === "ar" ? "دوري" : "Role" },
      { id: "discovery", label: locale === "ar" ? "الاكتشاف" : "Discovery" },
      {
        id: "mvp-strategy",
        label: locale === "ar" ? "الاستراتيجية" : "Strategy",
      },
      {
        id: "product-decisions",
        label: locale === "ar" ? "القرارات" : "Decisions",
      },
      { id: "workflows", label: locale === "ar" ? "التدفقات" : "Workflows" },
      { id: "delivery", label: locale === "ar" ? "التسليم" : "Delivery" },
      {
        id: "outcome-reflection",
        label: locale === "ar" ? "الأثر" : "Outcome",
      },
    ]
  }

  if (
    study.slug === "ynmo-daycare" ||
    study.slug === "ynmo-tifli" ||
    study.slug === "daawa"
  ) {
    return getEditorialCaseStudyNavItems(study, dir)
  }

  return CASE_STUDY_NAV_ITEMS.filter(({ shouldInclude }) =>
    shouldInclude(study)
  ).map(({ id, title }) => ({
    id,
    label: title[locale],
  }))
}

function renderArabicText(text: string) {
  return text
    .split(/([A-Za-z0-9]+(?:[ &/.-]+[A-Za-z0-9]+)*)/g)
    .map((part, index) =>
      /^[A-Za-z0-9]/.test(part) ? (
        <span key={index} className="font-mono">
          {part}
        </span>
      ) : (
        part
      )
    )
}

function formatPeriod(value: string) {
  const [month, year] = value.includes(".")
    ? value.split(".")
    : [undefined, value]
  const date = new Date(Number(year), month ? Number(month) - 1 : 0, 1)

  return new Intl.DateTimeFormat("ar-EG", {
    ...(month ? { month: "long" as const } : {}),
    year: "numeric",
    calendar: "gregory",
  }).format(date)
}

function DaawaVisual({
  visual,
  number,
}: {
  visual: NonNullable<CaseStudy["visuals"]>[number] | undefined
  number: string
}) {
  if (!visual) {
    return null
  }

  return (
    <div className="border-b border-line p-4 sm:p-5">
      <CaseStudyVisualFigure visual={visual} number={number} />
    </div>
  )
}

function CaseStudySectionNav({ study }: { study: CaseStudy }) {
  const { dir } = useLanguage()
  const items = useMemo(() => getCaseStudyNavItems(study, dir), [study, dir])
  const [activeId, setActiveId] = useState<string>(() => items[0]?.id ?? "")

  useEffect(() => {
    if (!items.length) {
      return
    }

    const sectionNodes = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sectionNodes.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          const nextId = visibleEntry.target.id
          setActiveId(nextId)
          if (window.location.hash.replace(/^#/, "") !== nextId) {
            window.history.replaceState(null, "", `#${nextId}`)
          }
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    )

    sectionNodes.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="أقسام دراسة الحالة"
      dir={dir}
      className="fixed inset-x-0 bottom-0 z-40 px-3 pt-1 pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="mx-auto w-[min(72vw,24rem)] rounded-full border border-line bg-background/90 p-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-sm">
        <div className="scrollbar-none overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max items-center justify-center gap-0.5 p-0.5">
            {items.map((item) => {
              const isActive = item.id === activeId

              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center rounded-full px-1.5 py-0.75 text-[8px] font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:px-2 sm:py-1 sm:text-[9px]",
                      isActive
                        ? "bg-muted text-foreground ring-1 ring-black/5 ring-inset dark:ring-white/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function CaseStudyStory({ study }: { study: CaseStudy }) {
  const getVisual = (fileName: string) =>
    study.visuals?.find((visual) => {
      const sources = Array.isArray(visual.src) ? visual.src : [visual.src]
      return sources.some((src) => src.endsWith(fileName))
    })

  const improvements = study.uxImprovements ?? []
  const challenges = [
    {
      title: "المشكلة",
      description: study.challenge,
    },
    {
      title: "أثرها على المنتج",
      description:
        study.businessImpact ?? study.problemUnderstanding ?? study.overview,
    },
  ]
  const strategy = study.redesignStrategy ?? []

  return (
    <div className="flex flex-col">
      <Panel
        id="business-challenge"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <PanelHeader>
          <PanelTitle className="tracking-normal">
            المشكلة وأثرها على المنتج
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-4">
          <p className="text-sm/relaxed text-muted-foreground">
            {study.overview}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {challenges.map((challenge) => (
              <section
                key={challenge.title}
                className="space-y-2 border border-line bg-surface/30 p-4"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {challenge.title}
                </h3>
                <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
                  {challenge.description}
                </p>
              </section>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">المستخدمون</p>
            <ul className="flex flex-wrap gap-1.5">
              {study.targetAudience.map((audience) => (
                <li key={audience}>
                  <Tag className="font-sans text-xs">{audience}</Tag>
                </li>
              ))}
            </ul>
          </div>
          {study.slug === "daawa" && (
            <p className="border-s-2 border-primary ps-3 text-xs/relaxed text-muted-foreground">
              لا تتوفر لقطات موثقة للواجهات السابقة؛ المعروض تصاميم إعادة
              التصميم المتاحة.
            </p>
          )}
        </PanelContent>
        <DaawaVisual visual={getVisual("product-overview.webp")} number="01" />
      </Panel>

      <Panel
        id="redesign-strategy"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <PanelHeader>
          <PanelTitle className="tracking-normal">
            استراتيجية إعادة التصميم
          </PanelTitle>
        </PanelHeader>
        <PanelContent>
          <p className="mb-4 text-sm/relaxed text-muted-foreground">
            {study.designSolution}
          </p>
          <ol className="grid gap-2 sm:grid-cols-2">
            {strategy.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 border border-line bg-surface/30 p-3"
              >
                <span className="font-mono text-xs text-primary">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-sm/relaxed text-foreground">{step}</span>
              </li>
            ))}
          </ol>
          {study.slug !== "daawa" && (
            <figure className="mt-4 space-y-3">
              <CaseStudyImage
                src={study.image}
                alt=""
                brandLogo={study.brandLogo}
                brandColor={study.brandColor}
              />
              <figcaption className="text-xs/relaxed text-muted-foreground">
                رسم تصوري لمسارات ومجالات المنتج، وليس لقطة تشغيلية من الواجهة.
              </figcaption>
            </figure>
          )}
        </PanelContent>
      </Panel>

      {study.visuals && study.slug !== "daawa" && (
        <Panel
          id="product-screens"
          className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
        >
          <PanelHeader>
            <PanelTitle className="tracking-normal">
              لقطات المنتج من واجهات التشغيل الفعلية
            </PanelTitle>
          </PanelHeader>
          <div className="divide-y divide-line">
            {study.visuals.map((visual, index) => (
              <DaawaVisual
                key={`${visual.title}-${index}`}
                visual={visual}
                number={(index + 1).toString().padStart(2, "0")}
              />
            ))}
          </div>
        </Panel>
      )}

      {study.slug === "daawa" && (
        <Panel id="onboarding-redesign">
          <PanelHeader>
            <PanelTitle className="tracking-normal">
              تسهيل التسجيل وبداية الاستخدام
            </PanelTitle>
          </PanelHeader>
          <PanelContent className="text-sm/relaxed text-muted-foreground">
            ترتب رحلة التهيئة خطوات البدء وتدفع المستخدم نحو إعداد ملف القضية
            وأول مهمة.
          </PanelContent>
          <DaawaVisual visual={getVisual("onboarding-flow.webp")} number="02" />
        </Panel>
      )}

      <Panel
        id="ux-improvements"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <PanelHeader>
          <PanelTitle className="tracking-normal">قرارات التصميم</PanelTitle>
        </PanelHeader>
        <div className="divide-y divide-line">
          {improvements.slice(0, 2).map((improvement, index) => (
            <section key={improvement.title} className="space-y-3 p-4 sm:p-5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-primary">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="font-medium text-foreground">
                  {improvement.title}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["المشكلة", improvement.problem],
                  ["قرار التصميم", improvement.decision],
                  ["التجربة المستهدفة", improvement.experience],
                  ["القيمة المستهدفة", improvement.value],
                ].map(([label, description]) => (
                  <div key={label} className="border-s border-line ps-3">
                    <p className="mb-1 text-xs font-medium text-foreground">
                      {label}
                    </p>
                    <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <DaawaVisual
          visual={getVisual("product-capabilities.webp")}
          number="03"
        />
        <div className="divide-y divide-line">
          {improvements.slice(2).map((improvement, index) => (
            <section key={improvement.title} className="space-y-3 p-4 sm:p-5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-primary">
                  {(index + 3).toString().padStart(2, "0")}
                </span>
                <h3 className="font-medium text-foreground">
                  {improvement.title}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["المشكلة", improvement.problem],
                  ["قرار التصميم", improvement.decision],
                  ["التجربة المستهدفة", improvement.experience],
                  ["القيمة المستهدفة", improvement.value],
                ].map(([label, description]) => (
                  <div key={label} className="border-s border-line ps-3">
                    <p className="mb-1 text-xs font-medium text-foreground">
                      {label}
                    </p>
                    <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <DaawaVisual visual={getVisual("legal-assistant.webp")} number="04" />
      </Panel>

      <Panel
        id="role-and-ownership"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <PanelHeader>
          <PanelTitle className="tracking-normal">دوري ونطاق العمل</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-4">
          <p className="text-sm font-medium text-foreground">{study.role}</p>
          <ul className="flex flex-wrap gap-1.5">
            {study.skills.map((skill) => (
              <li key={skill}>
                <Tag className="font-sans text-xs">{skill}</Tag>
              </li>
            ))}
          </ul>
          <p className="border-t border-dashed border-line pt-3 text-sm/relaxed text-muted-foreground">
            {study.collaborationAndDelivery}
          </p>
        </PanelContent>
      </Panel>

      <Panel
        id="product-impact"
        className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
      >
        <PanelHeader>
          <PanelTitle className="tracking-normal">
            المخرجات والأثر المستهدف
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-4">
          <div className="space-y-2 border-t border-dashed border-line pt-3">
            <h3 className="text-sm font-medium text-foreground">
              المخرجات المسجلة
            </h3>
            <ul className="space-y-2">
              {study.outcomesAndLearnings.map((outcome) => (
                <li
                  key={outcome}
                  className="text-sm/relaxed text-muted-foreground"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs/relaxed text-muted-foreground">
            لا تتضمن المواد المتاحة نتائج إطلاق أو قياسات أداء؛ لذلك تُعرض هذه
            النقاط كأهداف وقيمة تصميمية مستهدفة، لا كمكاسب رقمية محققة.
          </p>
        </PanelContent>
      </Panel>
    </div>
  )
}

export function CaseStudyDetailView({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const list = CASE_STUDIES
  const studyIndex = list.findIndex((item) => item.slug === slug)

  if (studyIndex === -1) {
    notFound()
  }

  const study = list[studyIndex]
  const prevStudy = studyIndex > 0 ? list[studyIndex - 1] : null
  const nextStudy = studyIndex < list.length - 1 ? list[studyIndex + 1] : null

  const localizedTextFont = "font-sans"
  const ChevronSeparator = ChevronLeftIcon
  const PrevArrow = ArrowRightIcon
  const NextArrow = ArrowLeftIcon

  return (
    <article className="flex flex-col pb-20 font-eight font-features-['ss01','zero'] sm:pb-24">
      {/* Top Breadcrumb Bar */}
      <div
        className={cn(
          "flex items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted-foreground",
          localizedTextFont
        )}
      >
        <AppLink
          href="/case-studies"
          className="transition-colors hover:text-foreground"
        >
          {t("nav.caseStudies")}
        </AppLink>
        <ChevronSeparator className="size-3 text-muted-foreground/60" />
        <span className="truncate text-foreground">
          {renderArabicText(study.title)}
        </span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-line bg-surface/30 p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn("text-xs text-muted-foreground", localizedTextFont)}
            >
              {renderArabicText(study.productType)}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span
              className={cn(
                "font-mono text-xs text-muted-foreground",
                "font-sans"
              )}
              dir="auto"
            >
              {formatPeriod(study.period.start)}
              {study.period.end && ` — ${formatPeriod(study.period.end)}`}
            </span>
          </div>

          <h1
            className="font-eight font-features-['ss01','zero'] text-3xl font-medium text-foreground sm:text-4xl"
            dir="auto"
          >
            {renderArabicText(study.title)}
          </h1>

          <p
            className="max-w-2xl text-base/relaxed text-muted-foreground"
            dir="auto"
          >
            {renderArabicText(study.subtitle)}
          </p>

          {/* Quick Meta Stats */}
          <div className="grid grid-cols-1 gap-3 border-t border-dashed border-line pt-3 sm:grid-cols-2">
            <div>
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  localizedTextFont
                )}
              >
                الدور والمسؤولية
              </p>
              <p className="text-sm font-medium text-foreground" dir="auto">
                {renderArabicText(study.role)}
              </p>
            </div>
            <div>
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  localizedTextFont
                )}
              >
                المنصات المدعومة
              </p>
              <p className="text-sm font-medium text-foreground" dir="auto">
                {study.platforms.map((platform, index) => (
                  <span key={platform}>
                    {index > 0 && "، "}
                    {renderArabicText(platform)}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* External References & Links */}
          {study.externalLinks && study.externalLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {study.externalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  className="gap-2 text-xs"
                  nativeButton={false}
                  render={
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <ExternalLinkIcon className="size-3.5" />
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {study.image && (
        <div className="border-b border-line p-4 sm:p-6">
          <figure className="space-y-2">
            <CaseStudyImage
              src={study.image}
              alt={`${study.title} — صورة تعريفية للمشروع`}
              brandLogo={study.brandLogo}
              brandColor={study.brandColor}
            />
            <figcaption className="text-xs text-muted-foreground">
              صورة تعريفية للمشروع، وليست لقطة شاشة تشغيلية.
            </figcaption>
          </figure>
        </div>
      )}

      <CaseStudySectionNav key={study.slug} study={study} />

      {study.slug === "elitevet" ? (
        <EliteVetCaseStudy study={study} />
      ) : study.slug === "ynmo-daycare" ||
        study.slug === "ynmo-tifli" ||
        study.slug === "daawa" ? (
        <EditorialCaseStudy study={study} />
      ) : study.redesignStrategy && study.uxImprovements ? (
        <CaseStudyStory study={study} />
      ) : (
        <>
          {/* Target Audience */}
          <Panel
            id="audience"
            className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
          >
            <PanelHeader>
              <PanelTitle>
                <span>لمن صُمم المنتج؟</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent>
              <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {study.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </PanelContent>
          </Panel>

          <Panel
            id="challenge"
            className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
          >
            <PanelHeader>
              <PanelTitle>
                <span>السياق والتحدي</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="space-y-4 text-sm/relaxed text-muted-foreground">
              <div>
                <h3 className="mb-1 font-medium text-foreground">
                  سياق المشروع
                </h3>
                <p>{study.overview}</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-foreground">
                  التحدي الجوهري
                </h3>
                <p>{study.challenge}</p>
              </div>
            </PanelContent>
          </Panel>

          {(study.problemUnderstanding ||
            study.researchInsights?.length ||
            study.problemDefinition ||
            study.prioritization) && (
            <Panel
              id="problem-framing"
              className="scroll-mt-[calc(var(--header-height)+(--spacing(16)))]"
            >
              <PanelHeader>
                <PanelTitle>
                  <span>فهم المشكلة وتحديد الأولويات</span>
                </PanelTitle>
              </PanelHeader>
              <PanelContent className="space-y-4 text-sm/relaxed text-muted-foreground">
                {study.problemUnderstanding && (
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">
                      ما الذي احتاجه المستخدمون؟
                    </h3>
                    <p>{study.problemUnderstanding}</p>
                  </div>
                )}
                {study.researchInsights &&
                  study.researchInsights.length > 0 && (
                    <ul className="space-y-2">
                      {study.researchInsights.map((insight) => (
                        <li key={insight} className="flex items-start gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                {study.problemDefinition && (
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">
                      صياغة المشكلة
                    </h3>
                    <p>{study.problemDefinition}</p>
                  </div>
                )}
                {study.prioritization && (
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">
                      ترتيب الأولويات
                    </h3>
                    <p>{study.prioritization}</p>
                  </div>
                )}
              </PanelContent>
            </Panel>
          )}

          {/* UX Process */}
          <Panel id="ux-process">
            <PanelHeader>
              <PanelTitle>
                <span>منهجية العمل</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent>
              <ol className="space-y-2.5 text-sm text-muted-foreground">
                {study.uxProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-primary">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </PanelContent>
          </Panel>

          <Panel id="solution">
            <PanelHeader>
              <PanelTitle>
                <span>الحل وتجربة الاستخدام</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="border-b border-dashed border-line text-sm/relaxed text-muted-foreground">
              <h3 className="mb-1 font-medium text-foreground">
                الحل التصميمي
              </h3>
              <p>{study.designSolution}</p>
            </PanelContent>
            <div className="divide-y divide-line">
              {study.keyFlowsAndFeatures.map((flow, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 p-4 sm:p-5">
                  <h4 className="text-sm font-medium text-foreground sm:text-base">
                    {flow.title}
                  </h4>
                  <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
                    {flow.description}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {study.visuals && study.visuals.length > 0 && (
            <Panel id="product-visuals">
              <PanelHeader>
                <PanelTitle>
                  <span>مشاهد من تجربة دعوى</span>
                </PanelTitle>
              </PanelHeader>
              <PanelContent className="text-sm/relaxed text-muted-foreground">
                لقطات مختارة تشرح واجهات المنتج ومفاهيم التصميم ومسارات
                الاستخدام. التصورات التصميمية معروضة بوصفها تصورات، لا نتائج
                تشغيلية.
              </PanelContent>
              <div className="divide-y divide-line">
                {study.visuals.map((visual, index) => {
                  const visualSources = Array.isArray(visual.src)
                    ? visual.src
                    : [visual.src]

                  return (
                    <figure
                      key={`${visual.title}-${index}`}
                      className="space-y-3 p-4 sm:p-5"
                    >
                      <div
                        className={cn(
                          "grid gap-3 overflow-hidden rounded-lg border border-line bg-surface/30",
                          visualSources.length > 1 && "md:grid-cols-2"
                        )}
                      >
                        {visualSources.map((src, srcIndex) => (
                          <div
                            key={`${src}-${srcIndex}`}
                            className={cn(
                              "overflow-hidden bg-surface/30",
                              visualSources.length > 1 && "min-h-[180px]"
                            )}
                          >
                            <Image
                              src={src}
                              alt={visual.alt}
                              width={visual.width}
                              height={visual.height}
                              sizes="(min-width: 768px) 560px, 100vw"
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <figcaption className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs text-primary">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                            <h3 className="text-sm font-medium text-foreground">
                              {visual.title}
                            </h3>
                          </div>
                          <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
                            {visual.description}
                          </p>
                        </div>
                        <Tag className="shrink-0 font-sans text-xs">
                          {visual.type}
                        </Tag>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
            </Panel>
          )}

          <Panel id="collaboration">
            <PanelHeader>
              <PanelTitle>
                <span>التعاون والتنفيذ</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="text-sm/relaxed text-muted-foreground">
              <p>{study.collaborationAndDelivery}</p>
            </PanelContent>
          </Panel>

          <Panel id="outcomes">
            <PanelHeader>
              <PanelTitle>
                <span>المخرجات والدروس المستفادة</span>
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="space-y-4 text-sm/relaxed text-muted-foreground">
              <div>
                <ul className="space-y-2">
                  {study.outcomesAndLearnings.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-xs text-primary">
                        ✓
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {SUCCESS_METRICS[slug]?.length > 0 && (
                <div className="border-t border-dashed border-line pt-3">
                  <h3 className="mb-2 font-medium text-foreground">
                    مؤشرات مقترحة لقياس الأثر
                  </h3>
                  <p className="mb-3 text-xs">
                    مؤشرات للمتابعة مستقبلًا، وليست نتائج رقمية محققة أو منشورة.
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {SUCCESS_METRICS[slug].map((metric) => (
                      <li
                        key={metric}
                        className="rounded-lg bg-muted/40 p-3 text-sm text-foreground inset-ring-1 inset-ring-border"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-dashed border-line pt-3">
                <p
                  className={cn(
                    "mb-2 text-xs text-foreground",
                    localizedTextFont
                  )}
                >
                  الكفاءات والمهارات المطبقة
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {study.skills.map((skill, idx) => (
                    <li key={idx} className="flex">
                      <Tag className="font-sans text-xs">
                        {renderArabicText(skill)}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </PanelContent>
          </Panel>
        </>
      )}

      {/* Bottom Prev/Next Navigation */}
      <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
        {prevStudy ? (
          <AppLink
            href={`/case-studies/${prevStudy.slug}`}
            className="flex flex-col gap-1 p-4 text-right transition-colors hover:bg-accent-muted/40"
          >
            <span
              className={cn(
                "flex items-center gap-1 text-xs text-muted-foreground",
                localizedTextFont
              )}
            >
              <PrevArrow className="size-3" />
              دراسة الحالة السابقة
            </span>
            <span className="truncate text-sm font-medium text-foreground">
              {prevStudy.title}
            </span>
          </AppLink>
        ) : (
          <div
            className={cn(
              "bg-muted/10 p-4 text-xs text-muted-foreground/40",
              localizedTextFont
            )}
          >
            البداية
          </div>
        )}

        {nextStudy ? (
          <AppLink
            href={`/case-studies/${nextStudy.slug}`}
            className="flex flex-col gap-1 p-4 text-left transition-colors hover:bg-accent-muted/40"
          >
            <span
              className={cn(
                "flex items-center justify-start gap-1 text-xs text-muted-foreground",
                localizedTextFont
              )}
            >
              دراسة الحالة التالية
              <NextArrow className="size-3" />
            </span>
            <span className="truncate text-sm font-medium text-foreground">
              {nextStudy.title}
            </span>
          </AppLink>
        ) : (
          <div
            className={cn(
              "bg-muted/10 p-4 text-right text-xs text-muted-foreground/40",
              localizedTextFont
            )}
          >
            النهاية
          </div>
        )}
      </div>
    </article>
  )
}
