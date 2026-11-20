"use client"

import {
  ArrowUpLeftIcon,
  CheckIcon,
  DownloadIcon,
  ShoppingBagIcon,
} from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

import { TEMPLATE_REQUEST_HREF, type Template } from "../data/templates"

export function TemplatePurchaseCard({ template }: { template: Template }) {
  const isFree = template.pricing === "free"
  const href = template.href ?? TEMPLATE_REQUEST_HREF
  const isExternal = href.startsWith("http")
  // A file in public/ is not a route: skip prefetching and client navigation.
  const isDownload = href.startsWith("/downloads/")
  const CtaIcon = isFree ? DownloadIcon : ShoppingBagIcon

  const includes = [
    `ملف ${template.format} جاهز للنسخ والتعديل`,
    `${template.contents.length} أقسام مرتبة وجاهزة للاستخدام`,
    "استخدام غير محدود في مشروعاتك وفريقك",
  ]

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden rounded-xl border p-5",
        isFree
          ? "border-line"
          : "border-primary/40 bg-linear-to-b from-primary/5 to-transparent ring-1 ring-primary/20"
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">السعر</span>
          {isFree ? (
            <span className="text-4xl font-medium text-foreground">مجاني</span>
          ) : (
            <span className="flex items-baseline gap-1.5">
              <span dir="ltr" className="text-4xl font-medium text-foreground">
                {template.priceUsd}$
              </span>
              <span className="text-sm text-muted-foreground">دفعة واحدة</span>
            </span>
          )}
        </div>

        <span className="font-mono text-xs text-muted-foreground" dir="ltr">
          {template.format}
        </span>
      </div>

      <ul className="flex flex-col gap-2 border-t border-line pt-4">
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckIcon
              className="mt-0.5 size-3.5 shrink-0 text-primary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={isFree ? "secondary" : "default"}
        className="w-full gap-2"
        nativeButton={false}
        render={
          <AppLink
            href={href}
            {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
            {...(isDownload ? { download: true, prefetch: false } : {})}
            onClick={() =>
              trackEvent({
                name: "template_get_click",
                properties: {
                  template_id: template.id,
                  pricing: template.pricing,
                  price_usd: template.priceUsd ?? 0,
                },
              })
            }
          />
        }
      >
        <CtaIcon className="size-4" aria-hidden />
        {isFree ? "احصل عليه مجانًا" : `اشترِ القالب بـ ${template.priceUsd}$`}
        <ArrowUpLeftIcon className="size-4 opacity-60" aria-hidden />
      </Button>

      {!isFree && !template.href && (
        <p className="text-xs/relaxed text-muted-foreground">
          أرسل طلبك من صفحة التواصل، ويصلك القالب بعد تأكيد الطلب والدفع.
        </p>
      )}
    </div>
  )
}
