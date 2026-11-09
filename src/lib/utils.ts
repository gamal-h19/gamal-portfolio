import { SITE_URL } from "@/lib/site-url"

export { cn } from "cn"

export function absoluteUrl(path: string) {
  return SITE_URL ? new URL(path, SITE_URL).toString() : path
}
