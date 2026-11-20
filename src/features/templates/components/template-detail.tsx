import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
} from "lucide-react"

import { Tag } from "@/components/ui/tag"
import { AppLink } from "@/components/app-link"
import { LinedGrid, LinedGridItem } from "@/components/lined-grid"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"

import {
  TEMPLATE_CATEGORIES,
  TEMPLATES,
  type Template,
} from "../data/templates"
import { getRelatedTemplates, getTemplatePath } from "../lib/get-template"
import { TemplateCard, TemplatePricingBadge } from "./template-card"
import { TemplatePreview } from "./template-preview"
import { TemplatePurchaseCard } from "./template-purchase-card"

const CATEGORY_LABELS = Object.fromEntries(
  TEMPLATE_CATEGORIES.map(({ value, label }) => [value, label])
)

function SiblingLink({
  template,
  direction,
}: {
  template: Template
  direction: "previous" | "next"
}) {
  const isPrevious = direction === "previous"
  const Icon = isPrevious ? ArrowRightIcon : ArrowLeftIcon

  return (
    <AppLink
      href={getTemplatePath(template)}
      className="group/sibling flex flex-col gap-1 p-4 transition-colors hover:bg-accent-muted data-[direction=next]:items-end data-[direction=next]:text-left"
      data-direction={direction}
    >
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        {isPrevious && <Icon className="size-3.5" aria-hidden />}
        {isPrevious ? "القالب السابق" : "القالب التالي"}
        {!isPrevious && <Icon className="size-3.5" aria-hidden />}
      </span>
      <span className="text-sm font-medium text-foreground">
        {template.title}
      </span>
    </AppLink>
  )
}

export function TemplateDetail({ template }: { template: Template }) {
  const index = TEMPLATES.findIndex(({ id }) => id === template.id)
  const previous = index > 0 ? TEMPLATES[index - 1] : null
  const next = index < TEMPLATES.length - 1 ? TEMPLATES[index + 1] : null
  const related = getRelatedTemplates(template)

  const stats = [
    { label: "التصنيف", value: CATEGORY_LABELS[template.category] },
    { label: "الأداة", value: template.format, isLatin: true },
    { label: "الأقسام", value: `${template.contents.length} أقسام` },
    {
      label: "السعر",
      value: template.pricing === "free" ? "مجاني" : `${template.priceUsd}$`,
    },
  ]

  return (
    <article
      dir="rtl"
      className="flex flex-col pb-8 font-eight font-features-['ss01','zero']"
    >
      <nav
        aria-label="مسار الصفحة"
        className="flex items-center gap-2 border-b border-line px-4 py-3 font-sans text-xs text-muted-foreground"
      >
        <AppLink
          href="/templates"
          className="transition-colors hover:text-foreground"
        >
          القوالب
        </AppLink>
        <ChevronLeftIcon
          className="size-3 text-muted-foreground/60"
          aria-hidden
        />
        <span className="truncate text-foreground" aria-current="page">
          {template.title}
        </span>
      </nav>

      <header className="relative overflow-hidden border-b border-line p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary)_0%,transparent_60%)] opacity-[0.07]"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-muted-foreground">
            <span>{CATEGORY_LABELS[template.category]}</span>
            <span className="text-muted-foreground/40" aria-hidden>
              •
            </span>
            <span className="font-mono" dir="ltr">
              {template.format}
            </span>
            <TemplatePricingBadge template={template} />
          </div>

          <h1 className="text-3xl font-medium text-balance text-foreground sm:text-4xl">
            {template.title}
          </h1>

          <p className="max-w-2xl text-base/relaxed text-pretty text-muted-foreground">
            {template.overview}
          </p>

          <ul className="flex flex-wrap gap-1.5" aria-label="الوسوم">
            {template.tags.map((tag) => (
              <li key={tag}>
                <Tag className="font-sans text-xs">{tag}</Tag>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-3 border-t border-dashed border-line pt-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="font-sans text-xs text-muted-foreground">
                  {stat.label}
                </dt>
                <dd
                  className="text-sm font-medium text-foreground"
                  dir={stat.isLatin ? "ltr" : undefined}
                >
                  <bdi>{stat.value}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Panel id="preview">
        <PanelHeader>
          <PanelTitle className="text-2xl tracking-normal">
            معاينة القالب
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="flex flex-col gap-3 sm:p-6">
          <TemplatePreview template={template} />
          <p className="text-xs/relaxed text-muted-foreground">
            معاينة توضيحية لهيكل القالب وأقسامه، وليست لقطة من الملف نفسه.
          </p>
        </PanelContent>
      </Panel>

      <Panel id="contents">
        <PanelHeader>
          <PanelTitle className="text-2xl tracking-normal">
            محتوى القالب
          </PanelTitle>
        </PanelHeader>
        <ol className="divide-y divide-line">
          {template.contents.map((section, sectionIndex) => (
            <li key={section.title} className="flex items-start gap-4 p-4">
              <span className="mt-0.5 font-mono text-xs text-primary">
                {(sectionIndex + 1).toString().padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-foreground">
                  {section.title}
                </h3>
                <p className="text-sm/relaxed text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel id="value">
        <PanelHeader>
          <PanelTitle className="text-2xl tracking-normal">
            لماذا هذا القالب؟
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="grid gap-6 sm:grid-cols-2">
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground">
              ماذا ستحصل عليه
            </h3>
            <ul className="flex flex-col gap-2">
              {template.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm/relaxed text-muted-foreground"
                >
                  <CheckIcon
                    className="mt-1 size-3.5 shrink-0 text-primary"
                    aria-hidden
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground">
              لمن هذا القالب
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {template.audience.map((audience) => (
                <li key={audience}>
                  <Tag className="font-sans text-xs">{audience}</Tag>
                </li>
              ))}
            </ul>
          </section>
        </PanelContent>
      </Panel>

      <Panel id="get-template">
        <PanelHeader>
          <PanelTitle className="text-2xl tracking-normal">
            {template.pricing === "free" ? "احصل على القالب" : "اشترِ القالب"}
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="sm:p-6">
          <TemplatePurchaseCard template={template} />
        </PanelContent>
      </Panel>

      {related.length > 0 && (
        <section aria-labelledby="related-templates" className="pt-4">
          <h2
            id="related-templates"
            className="screen-line-top px-4 text-2xl font-medium"
          >
            قوالب قد تفيدك
          </h2>
          <LinedGrid>
            {related.map((item) => (
              <LinedGridItem key={item.id}>
                <TemplateCard template={item} />
              </LinedGridItem>
            ))}
          </LinedGrid>
        </section>
      )}

      {(previous || next) && (
        <nav
          aria-label="التنقل بين القوالب"
          className="grid grid-cols-2 divide-x divide-line border-y border-line"
        >
          {previous ? (
            <SiblingLink template={previous} direction="previous" />
          ) : (
            <span />
          )}
          {next ? <SiblingLink template={next} direction="next" /> : <span />}
        </nav>
      )}
    </article>
  )
}
