"use client"

import React from "react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { GamalSignature } from "@/components/gamal-signature"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER_AR } from "@/features/portfolio/data/user-ar"

/** Footer laid out as the title block of a technical drawing. */
export function SiteFooterCad() {
  const { t } = useLanguage()
  const user = USER_AR

  return (
    <footer className="max-w-screen overflow-x-clip px-2">
      <div className="mx-auto border-x border-x-line group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom before:z-1">
          <div className="stripe-divider h-8" />
        </div>

        <div className="relative">
          <div className="screen-line-bottom flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 font-mono text-sm">
            <span className="font-sans font-medium text-foreground">
              {user.displayName}
            </span>
            <span className="font-sans text-xs text-muted-foreground sm:text-sm">
              {user.jobTitle}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-px bg-line font-mono sm:grid-cols-4">
            <Field label={t("footer.location")}>
              <span>{user.address}</span>
            </Field>

            <Field
              label={t("footer.signatureMessage")}
              valueClassName="leading-[16.5px] sm:leading-[22px]"
            >
              <GamalSignature className="text-muted-foreground" />
            </Field>

            <Field label={t("footer.focus")}>
              <span>{t("footer.focusValue")}</span>
            </Field>

            <Field label={t("footer.availability")}>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                {t("footer.availableStatus")}
              </span>
            </Field>
          </dl>
        </div>

        <div className="screen-line-top h-4" />

        <div className="screen-line-top screen-line-bottom flex items-center justify-between gap-3 px-4 py-3 pb-[calc(--spacing(14)+env(safe-area-inset-bottom,0))] text-muted-foreground sm:pb-3">
          <span className="font-sans text-xs">
            © <span className="font-mono">{new Date().getFullYear()}</span>{" "}
            {user.displayName} • {t("footer.rightsReserved")}
          </span>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link, index) => (
              <React.Fragment key={link.name}>
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="data-vertical:h-4 data-vertical:self-center"
                  />
                )}
                <a
                  className="flex items-center transition-[color] hover:text-foreground"
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.title}
                >
                  {SOCIAL_ICONS[link.name]
                    ? React.cloneElement(SOCIAL_ICONS[link.name], {
                        className: "size-4",
                      })
                    : null}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0)]" />
    </footer>
  )
}

function Field({
  className,
  label,
  valueClassName,
  children,
}: {
  className?: string
  label?: string
  valueClassName?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 bg-background px-4 py-3",
        className
      )}
    >
      {label?.trim() ? (
        <dt className="text-right font-sans text-xs/4 font-medium text-muted-foreground">
          {label}
        </dt>
      ) : null}
      <dd
        className={cn(
          "flex-1 text-right font-sans text-xs text-foreground sm:text-sm",
          valueClassName,
          !label?.trim() &&
            "flex items-center justify-center text-base font-medium sm:text-xl"
        )}
        dir="auto"
      >
        {children}
      </dd>
    </div>
  )
}
