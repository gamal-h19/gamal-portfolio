import React from "react"

import { Separator } from "@/components/ui/separator"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-clip px-2">
      <div className="mx-auto border-x border-line group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom">
          <div className="stripe-divider h-12" />
        </div>

        <div className="p-4 font-mono sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {USER.displayName}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {USER.jobTitle}
              </p>
            </div>
            <a
              className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
              href="mailto:gamal.htg@gmail.com"
            >
              gamal.htg@gmail.com
            </a>
          </div>
        </div>

        <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-line bg-background px-4 py-2">
            {SOCIAL_LINKS.map((link, index) => (
              <React.Fragment key={link.name}>
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="data-vertical:h-4 data-vertical:self-center"
                  />
                )}
                <a
                  className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.title}
                  title={link.title}
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
