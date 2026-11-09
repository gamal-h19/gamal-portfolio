import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { GoogleTagManager } from "@next/third-parties/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import type { WebSite, WithContext } from "schema-dts"

import { JSON_LD_ID, personJsonLd } from "@/config/json-ld"
import { META_THEME_COLORS, SITE_INFO, X_HANDLE } from "@/config/site"
import { fontVariables } from "@/lib/fonts"
import { JsonLdScript } from "@/lib/json-ld"
import { Providers } from "@/components/providers"
import { USER } from "@/features/portfolio/data/user"
import { USER_AR } from "@/features/portfolio/data/user-ar"

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": JSON_LD_ID.website,
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    author: personJsonLd,
  }
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`

export const metadata: Metadata = {
  ...(SITE_INFO.url ? { metadataBase: new URL(SITE_INFO.url) } : {}),
  title: {
    template: "%s | جمال حسن",
    default: "جمال حسن | مصمم تجربة المستخدم ومدير المنتجات",
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: USER_AR.displayName,
      url: SITE_INFO.url,
    },
  ],
  creator: USER_AR.displayName,
  openGraph: {
    siteName: USER_AR.displayName,
    url: "/",
    type: "profile",
    locale: "ar_EG",
    firstName: USER_AR.displayName.split(" ")[0],
    lastName: USER_AR.displayName.split(" ").slice(1).join(" "),
    username: USER.username,
    gender: USER.gender,
    ...(SITE_INFO.url
      ? {
          images: [
            {
              url: SITE_INFO.ogImage,
              width: 1200,
              height: 630,
              alt: SITE_INFO.name,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    ...(SITE_INFO.url ? { images: [SITE_INFO.ogImage] } : {}),
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="font-eight font-features-['ss01','zero']">
        <Script
          id="dark-mode-initialization"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
          strategy="beforeInteractive"
        />
        <Script
          id="avatar-lights-initialization"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('avatarLights');
                document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
              } catch(_) {}
            `,
          }}
          strategy="beforeInteractive"
        />
        <Script
          id="sidebar-initialization"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('sidebarOpen');
                document.documentElement.dataset.sidebarOpen = JSON.parse(value || 'true');
              } catch(_) {}
            `,
          }}
          strategy="beforeInteractive"
        />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <JsonLdScript data={getWebSiteJsonLd()} />
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  )
}
