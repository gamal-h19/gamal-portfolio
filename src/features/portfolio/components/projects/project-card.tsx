"use client"

import { AppLink } from "@/components/app-link"
import type { CaseStudy } from "@/features/portfolio/data/case-studies"

import { CaseStudyImage } from "./case-study-image"

export function ProjectCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="group/case-study relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted">
      {caseStudy.image && (
        <CaseStudyImage
          src={caseStudy.image}
          brandLogo={caseStudy.brandLogo}
          brandColor={caseStudy.brandColor}
        />
      )}

      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg/snug font-medium text-balance">
          <AppLink href={`/case-studies/${caseStudy.slug}`}>
            <span className="absolute inset-0" aria-hidden />
            {caseStudy.title}
          </AppLink>
        </h3>

        {caseStudy.subtitle && (
          <p className="text-sm text-muted-foreground">{caseStudy.subtitle}</p>
        )}
      </div>
    </div>
  )
}
