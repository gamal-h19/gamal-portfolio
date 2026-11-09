import { readFileSync } from "node:fs"
import { join } from "node:path"
import { escapeXml } from "@/utils/string"

import { getBlogPosts } from "@/features/doc/data/documents"

const thmanyahSans = readFileSync(
  join(
    process.cwd(),
    "src/assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2"
  )
).toString("base64")

type CoverTheme = {
  accent: string
  motif: string
}

function getCoverTheme(slug: string): CoverTheme {
  if (slug.includes("ai")) {
    return {
      accent: "#8b78cc",
      motif: `<g fill="none" stroke="#8b78cc" stroke-width="3">
        <path d="M170 220 270 150l100 70-100 70zM170 220v110l100 60V260M370 220v110l-100 60"/>
        <circle cx="170" cy="220" r="13" fill="#171717"/><circle cx="270" cy="150" r="13" fill="#171717"/>
        <circle cx="370" cy="220" r="13" fill="#171717"/><circle cx="170" cy="330" r="13" fill="#171717"/>
        <circle cx="270" cy="390" r="13" fill="#171717"/><circle cx="370" cy="330" r="13" fill="#171717"/>
      </g>`,
    }
  }

  if (slug.includes("journey") || slug.includes("onboarding")) {
    return {
      accent: "#52a9a0",
      motif: `<path d="M115 315h85l55-85h70l60 90h95" fill="none" stroke="#52a9a0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <g fill="#171717" stroke="#52a9a0" stroke-width="5">
          <circle cx="115" cy="315" r="15"/><circle cx="200" cy="315" r="15"/><circle cx="255" cy="230" r="15"/>
          <circle cx="325" cy="230" r="15"/><circle cx="385" cy="320" r="15"/><circle cx="480" cy="320" r="15"/>
        </g>`,
    }
  }

  if (
    slug.includes("analytics") ||
    slug.includes("growth") ||
    slug.includes("experimentation")
  ) {
    return {
      accent: "#d1a64a",
      motif: `<path d="M125 385V245m85 140V195m85 190V285m85 100V150m85 235V220" stroke="#d1a64a" stroke-width="22" stroke-linecap="round"/>
        <path d="m125 205 85-65 85 48 85-72 85 53" fill="none" stroke="#f1d38a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    }
  }

  if (
    slug.includes("accessibility") ||
    slug.includes("design-system") ||
    slug.includes("service-design")
  ) {
    return {
      accent: "#dc876e",
      motif: `<g fill="#dc876e">
        <rect x="125" y="145" width="100" height="90" rx="18"/><rect x="255" y="145" width="100" height="90" rx="18" opacity=".65"/>
        <rect x="385" y="145" width="100" height="90" rx="18" opacity=".4"/><rect x="125" y="265" width="100" height="90" rx="18" opacity=".65"/>
        <rect x="255" y="265" width="100" height="90" rx="18" opacity=".4"/><rect x="385" y="265" width="100" height="90" rx="18"/>
      </g>`,
    }
  }

  if (
    slug.includes("research") ||
    slug.includes("interview") ||
    slug.includes("feedback") ||
    slug.includes("user")
  ) {
    return {
      accent: "#7197c7",
      motif: `<g fill="none" stroke="#7197c7" stroke-width="5">
        <circle cx="210" cy="245" r="63"/><circle cx="345" cy="245" r="63"/>
        <path d="M160 300c-35 22-53 54-57 96h89m192-96c35 22 53 54 57 96h-89"/>
        <path d="M265 350h100l24 26-24 26h-100z" fill="#171717"/>
      </g>`,
    }
  }

  return {
    accent: "#c27b9a",
    motif: `<g fill="none" stroke="#c27b9a" stroke-width="5">
      <circle cx="200" cy="255" r="78"/><circle cx="335" cy="255" r="78"/>
      <path d="M267 190a78 78 0 0 1 0 130 78 78 0 0 1 0-130Z" fill="#c27b9a" fill-opacity=".26"/>
      <path d="M130 365h280" stroke-dasharray="8 12"/>
    </g>
    <g fill="#c27b9a"><circle cx="130" cy="365" r="9"/><circle cx="270" cy="365" r="9"/><circle cx="410" cy="365" r="9"/></g>`,
  }
}

function wrapTitle(title: string, maxLength: number) {
  const lines: string[] = []
  let line = ""

  for (const word of title.split(/\s+/u)) {
    const nextLine = line ? `${line} ${word}` : word

    if (line && nextLine.length > maxLength) {
      lines.push(line)
      line = word
    } else {
      line = nextLine
    }
  }

  if (line) {
    lines.push(line)
  }

  return lines
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getBlogPosts().find((item) => item.slug === slug)

  if (!post) {
    return new Response("Not found", { status: 404 })
  }

  const theme = getCoverTheme(slug)
  const title = escapeXml(post.metadata.title)
  const titleLines = wrapTitle(post.metadata.title, 22)
    .map(
      (line, index) =>
        `<tspan x="896" dy="${index === 0 ? 0 : 50}">${escapeXml(line)}</tspan>`
    )
    .join("")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
    <title id="title">${title}</title>
    <desc id="description">رسم توضيحي لموضوع المقال</desc>
    <style>@font-face{font-family:ThmanyahSans;src:url(data:font/woff2;base64,${thmanyahSans}) format('woff2');font-weight:400}</style>
    <rect width="1200" height="630" fill="#111111"/>
    <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#393939"/>
    <path d="M620 28v574" stroke="#393939"/>
    <circle cx="320" cy="270" r="205" fill="${theme.accent}" fill-opacity=".08"/>
    ${theme.motif}
    <circle cx="96" cy="88" r="6" fill="${theme.accent}"/>
    <text x="1090" y="126" text-anchor="end" fill="#a3a3a3" font-family="ThmanyahSans, sans-serif" font-size="24">جمال حسن · مقالات</text>
    <text x="896" y="235" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" fill="#fafafa" font-family="ThmanyahSans, sans-serif" font-size="38" font-weight="400">${titleLines}</text>
    <path d="M900 440h190" stroke="${theme.accent}" stroke-width="5" stroke-linecap="round"/>
    <text x="1090" y="495" text-anchor="end" fill="#a3a3a3" font-family="ThmanyahSans, sans-serif" font-size="22">المنتج · تجربة المستخدم · الأعمال</text>
  </svg>`

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
