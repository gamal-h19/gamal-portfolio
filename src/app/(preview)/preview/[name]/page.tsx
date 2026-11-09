import { cache, Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SITE_INFO, X_HANDLE } from "@/config/site"
import { getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { Index } from "@/registry/__index__"
import { PreviewProvider } from "@/app/(preview)/components/preview-provider"
import { getCachedThemes } from "@/app/(preview)/lib/get-themes"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const { Index } = await import("@/registry/__index__")

  const params: Array<{ name: string }> = []

  for (const itemName in Index) {
    const item = Index[itemName]
    if (["registry:block", "registry:example"].includes(item.type)) {
      params.push({
        name: item.name,
      })
    }
  }

  return params
}

type PreviewPageProps = {
  params: Promise<{ name: string }>
}

const getCachedRegistryItem = cache(async (name: string) => {
  return await getRegistryItem(name)
})

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { name } = await params

  const item = await getCachedRegistryItem(name)

  if (!item) {
    return {}
  }

  const title = item.name
  const description = item.description

  const blockUrl = `/preview/${item.name}`
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

  return {
    title,
    description,
    alternates: {
      canonical: blockUrl,
    },
    openGraph: {
      url: blockUrl,
      type: "website",
      ...(SITE_INFO.url
        ? {
            images: {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      ...(SITE_INFO.url ? { images: [ogImage] } : {}),
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const name = (await params).name

  const [item, themes] = await Promise.all([
    getCachedRegistryItem(name),
    getCachedThemes(),
  ])
  const Component = Index[name]?.component

  if (!item || !Component) {
    return notFound()
  }

  return (
    <div className={cn("style-preview", item?.meta?.previewClassName)}>
      <Suspense fallback={<div className="min-h-svh" />}>
        <PreviewProvider themes={themes}>
          <Component />
        </PreviewProvider>
      </Suspense>
    </div>
  )
}
