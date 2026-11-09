import type { Metadata, ResolvingMetadata } from "next"

import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

import { CaseStudyDetailView } from "./case-study-detail-view"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES.find((item) => item.slug === slug)

  if (!study) {
    return {
      title: "دراسة الحالة غير موجودة",
    }
  }

  const title = `${study.title} | دراسة حالة`
  const description = study.subtitle
  const parentMetadata = await parent
  const url = `/case-studies/${study.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      ...parentMetadata.twitter,
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <CaseStudyDetailView slug={slug} />
}
