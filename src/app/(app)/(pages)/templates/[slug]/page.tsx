import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { TemplateDetail } from "@/features/templates/components/template-detail"
import { TEMPLATES } from "@/features/templates/data/templates"
import {
  getTemplateById,
  getTemplatePath,
} from "@/features/templates/lib/get-template"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return TEMPLATES.map((template) => ({ slug: template.id }))
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateById(slug)

  if (!template) {
    return { title: "القالب غير موجود" }
  }

  const title = `${template.title} | القوالب`
  const description = template.description
  const url = getTemplatePath(template)
  const parentMetadata = await parent

  return {
    title,
    description,
    keywords: [...template.tags, "قوالب", "جمال حسن"],
    alternates: { canonical: url },
    openGraph: {
      ...parentMetadata.openGraph,
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      ...parentMetadata.twitter,
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params
  const template = getTemplateById(slug)

  if (!template) {
    notFound()
  }

  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "الرئيسية", href: "/" },
          { name: "القوالب", href: "/templates" },
          { name: template.title, href: getTemplatePath(template) },
        ])}
      />
      <TemplateDetail template={template} />
    </>
  )
}
