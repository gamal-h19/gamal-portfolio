import { GraduationCapIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/ui/separator"
import { Tag } from "@/components/ui/tag"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/collapsible-animated"
import { Markdown } from "@/components/markdown"
import type { Education } from "@/features/portfolio/types/education"

export function EducationItem({ item }: { item: Education }) {
  const { t } = useLanguage()
  const { start, end } = item.period

  return (
    <div className="group/education-item relative before:absolute before:inset-s-3 before:h-full before:w-px before:bg-border">
      <div
        className="pointer-events-none absolute inset-s-3 bottom-0 hidden size-4 bg-background group-last/education-item:flex"
        aria-hidden
      >
        <span className="size-full -translate-y-2.25 rounded-es-sm border-s border-b" />
      </div>

      <Collapsible defaultOpen={item.isExpanded} disabled={!item.description}>
        <CollapsibleTrigger
          className={cn(
            "group block w-full",
            "text-right",
            "relative before:absolute before:inset-s-7 before:-inset-e-1 before:-top-1 before:-bottom-1.5 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
            "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
            <IconTile>
              <GraduationCapIcon />
            </IconTile>

            <h3 className="flex-1 font-medium text-balance">{item.school}</h3>

            <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:h-lh [&_svg]:w-4">
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </div>
          </div>

          <dl
            className="flex flex-wrap items-center gap-x-2 ps-9 text-sm text-muted-foreground"
            dir="auto"
          >
            <div>
              <dt className="sr-only">{t("education.studyPeriod")}</dt>
              <dd className="flex items-center gap-0.5 tabular-nums" dir="ltr">
                <span>{formatYear(start)}</span>
                <span className="font-mono">—</span>
                {!end ? (
                  <span className="font-sans">{t("experience.present")}</span>
                ) : (
                  <span>{formatYear(end)}</span>
                )}
              </dd>
            </div>

            {item.degree && (
              <>
                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                  aria-hidden
                />

                <div>
                  <dt className="sr-only">{t("education.degree")}</dt>
                  <dd>{item.degree}</dd>
                </div>
              </>
            )}

            {item.fieldOfStudy && (
              <>
                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                  aria-hidden
                />

                <div>
                  <dt className="sr-only">{t("education.fieldOfStudy")}</dt>
                  <dd>{item.fieldOfStudy}</dd>
                </div>
              </>
            )}
          </dl>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {item.description && (
            <div className="typeset typeset-description ps-9 pt-3 pb-1">
              <Markdown>{item.description}</Markdown>
            </div>
          )}
        </CollapsibleContent>

        {Array.isArray(item.skills) && item.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 ps-9 pt-3">
            {item.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag className="font-sans">{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </Collapsible>
    </div>
  )
}

function formatYear(year: string) {
  return new Intl.NumberFormat("ar-EG", { useGrouping: false }).format(
    Number(year)
  )
}
