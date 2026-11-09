const configuredUrl = process.env.NEXT_PUBLIC_APP_URL

function getSiteUrl() {
  if (!configuredUrl) {
    return ""
  }

  const url = new URL(configuredUrl)

  if (
    process.env.NODE_ENV === "production" &&
    (url.hostname === "localhost" ||
      url.hostname.endsWith(".localhost") ||
      url.hostname.startsWith("127.") ||
      url.hostname === "0.0.0.0" ||
      url.hostname === "::1")
  ) {
    return ""
  }

  return configuredUrl
}

export const SITE_URL = getSiteUrl()
