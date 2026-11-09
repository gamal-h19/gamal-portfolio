import Image from "next/image"
import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { useLanguage } from "@/lib/i18n/language-context"

import type { Experience } from "../../types/experiences"
import { ExperiencePositionItem } from "./experience-position-item"

export function ExperienceItem({ experience }: { experience: Experience }) {
  const { t } = useLanguage()
  const locationTypeLabel = experience.locationType
    ? t(
        experience.locationType === "Remote"
          ? "experience.remote"
          : experience.locationType === "Hybrid"
            ? "experience.hybrid"
            : "experience.onSite"
      )
    : null
  const locationRepeatsType =
    locationTypeLabel &&
    experience.location?.trim().toLocaleLowerCase() ===
      locationTypeLabel.trim().toLocaleLowerCase()

  return (
    <div
      id={`experience-${experience.id}`}
      className="group/experience screen-line-bottom scroll-mt-14 space-y-4 py-4"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div className="relative flex size-8 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              fill
              sizes="32px"
              quality={100}
              className="rounded-md object-contain grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/experience:grayscale-0"
              unoptimized
              aria-hidden
            />
          ) : (
            (experience.companyIcon ?? (
              <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            ))
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pe-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl/6 font-medium" dir="auto">
            {experience.companyWebsite ? (
              <a
                className="link"
                href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                target="_blank"
                rel="noopener"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>

          {(experience.location || locationTypeLabel) && (
            <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
              <dt className="sr-only">{t("experience.location")}</dt>
              {experience.location && (
                <dd className="truncate font-sans" dir="auto">
                  {experience.location}
                </dd>
              )}

              {locationTypeLabel && !locationRepeatsType && (
                <>
                  <dt className="sr-only">{t("experience.locationType")}</dt>
                  <dd className="font-sans" dir="auto">
                    ({locationTypeLabel})
                  </dd>
                </>
              )}

              {experience.isCurrentEmployer && (
                <>
                  <dt className="sr-only">
                    {t("experience.employmentStatus")}
                  </dt>
                  <dd>
                    <span className="sr-only">{t("experience.current")}</span>
                    <span className="relative flex size-2.5 translate-px items-center justify-center">
                      <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-info opacity-50" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-info" />
                    </span>
                  </dd>
                </>
              )}
            </dl>
          )}
        </div>
      </div>

      <div className="relative space-y-4 before:absolute before:inset-s-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}
