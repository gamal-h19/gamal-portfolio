import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    ...(SITE_INFO.url
      ? { sitemap: new URL("/sitemap.xml", SITE_INFO.url).toString() }
      : {}),
  }
}
