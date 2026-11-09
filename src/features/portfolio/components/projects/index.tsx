"use client"

import { ArrowLeftIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

import { ProjectCard } from "./project-card"

const ID = "selected-work"

export function Projects({ title }: { title?: string } = {}) {
  const { t } = useLanguage()
  const caseStudies = CASE_STUDIES
  const sectionTitle = title ?? t("section.selectedWork")

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{sectionTitle}</a>
          <PanelTitleSup>({caseStudies.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-4">
        <ul
          aria-label={sectionTitle}
          className="grid w-full auto-cols-[min(90%,24rem)] grid-flow-col gap-4 px-4 sm:auto-cols-[calc((100%-1rem)/2)]"
          dir="rtl"
        >
          {caseStudies.map((project) => (
            <li key={project.slug} className="snap-start">
              <ProjectCard caseStudy={project} />
            </li>
          ))}
        </ul>
      </div>

      <div className="screen-line-top flex justify-center py-4">
        <Button
          className="gap-2 pr-2.5 pl-3 shadow-[inset_0_0_1px] shadow-foreground/20"
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<AppLink href="/case-studies" />}
        >
          {t("action.viewAllCaseStudies")}
          <ArrowLeftIcon className="size-4" />
        </Button>
      </div>
    </Panel>
  )
}
