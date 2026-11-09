"use client"

import { LinedGrid, LinedGridItem } from "@/components/lined-grid"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ProjectCard } from "@/features/portfolio/components/projects/project-card"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

export function CaseStudiesContent() {
  const caseStudies = CASE_STUDIES

  return (
    <div className="flex flex-col">
      <PageHeading>
        <PageHeadingTagline>دراسات حالة</PageHeadingTagline>
        <PageHeadingTitle>من التحدي إلى الحل</PageHeadingTitle>
        <PageHeadingDescription>
          استكشف أمثلة من عملي: المشكلة، دوري، وكيف ساعد التصميم المستخدمين.
        </PageHeadingDescription>
      </PageHeading>

      <LinedGrid>
        {caseStudies.map((caseStudy) => (
          <LinedGridItem key={caseStudy.slug}>
            <ProjectCard caseStudy={caseStudy} />
          </LinedGridItem>
        ))}
      </LinedGrid>
    </div>
  )
}
