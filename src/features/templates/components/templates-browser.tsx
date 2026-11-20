"use client"

import { SearchXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { LinedGrid, LinedGridItem } from "@/components/lined-grid"

import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_PRICING,
  type Template,
} from "../data/templates"
import { useTemplateFilters } from "../hooks/use-template-filters"
import { filterTemplates } from "../lib/filter-templates"
import { TemplateCard } from "./template-card"
import { TemplatesSearchInput } from "./templates-search-input"

function FilterChip({
  isActive,
  count,
  onClick,
  children,
}: {
  isActive: boolean
  count: number
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={isActive ? "default" : "secondary"}
      className="h-8 rounded-full px-3 text-xs"
      onClick={onClick}
      aria-pressed={isActive}
    >
      {children}
      <span className="font-mono text-[0.7rem] opacity-60">{count}</span>
    </Button>
  )
}

export function TemplatesBrowser({ templates }: { templates: Template[] }) {
  const { filters, setQuery, setCategory, setPricing, resetFilters } =
    useTemplateFilters()

  const results = filterTemplates(templates, filters)
  // Chip counts reflect the other active filters, so a chip never promises results it cannot show.
  const countFor = (overrides: Partial<typeof filters>) =>
    filterTemplates(templates, { ...filters, ...overrides }).length

  const hasActiveFilters =
    filters.query !== "" ||
    filters.category !== "all" ||
    filters.pricing !== "all"

  return (
    <>
      <div className="screen-line-bottom flex flex-col gap-3 p-3 after:z-20">
        <TemplatesSearchInput query={filters.query} onQueryChange={setQuery} />

        <div className="flex flex-wrap gap-2" role="group" aria-label="التصنيف">
          <FilterChip
            isActive={filters.category === "all"}
            count={countFor({ category: "all" })}
            onClick={() => setCategory("all")}
          >
            كل التصنيفات
          </FilterChip>
          {TEMPLATE_CATEGORIES.map((category) => (
            <FilterChip
              key={category.value}
              isActive={filters.category === category.value}
              count={countFor({ category: category.value })}
              onClick={() => setCategory(category.value)}
            >
              {category.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="السعر">
          <FilterChip
            isActive={filters.pricing === "all"}
            count={countFor({ pricing: "all" })}
            onClick={() => setPricing("all")}
          >
            الكل
          </FilterChip>
          {TEMPLATE_PRICING.map((pricing) => (
            <FilterChip
              key={pricing.value}
              isActive={filters.pricing === pricing.value}
              count={countFor({ pricing: pricing.value })}
              onClick={() => setPricing(pricing.value)}
            >
              {pricing.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <p aria-live="polite">
            {results.length === templates.length
              ? `${templates.length} قوالب`
              : `${results.length} من ${templates.length} قوالب`}
          </p>
          {hasActiveFilters && (
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={resetFilters}
            >
              مسح الفلاتر
            </Button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <LinedGrid>
          {results.map((template) => (
            <LinedGridItem key={template.id}>
              <TemplateCard template={template} />
            </LinedGridItem>
          ))}
        </LinedGrid>
      ) : (
        <Empty className="py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle>لا توجد قوالب مطابقة</EmptyTitle>
            <EmptyDescription>
              جرّب كلمات أخرى أو غيّر التصنيف أو نوع السعر.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" variant="outline" onClick={resetFilters}>
              عرض كل القوالب
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </>
  )
}
