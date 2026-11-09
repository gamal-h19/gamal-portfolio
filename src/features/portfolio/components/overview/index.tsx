"use client"

import { MapPinIcon } from "lucide-react"

import { EXPERIENCES_AR } from "@/features/portfolio/data/experiences-ar"
import { USER } from "@/features/portfolio/data/user"
import { USER_AR } from "@/features/portfolio/data/user-ar"

import { Panel, PanelContent } from "../panel"
import { CurrentLocalTimeItem } from "./current-local-time-item"
import { EmailItem } from "./email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"
import { JobItem } from "./job-item"
import { PhoneItem } from "./phone-item"

export function Overview() {
  const user = USER_AR
  const featuredExperience = EXPERIENCES_AR.find(
    (experience) => experience.id === "daawa"
  )
  const featuredPosition = featuredExperience?.positions[0]

  return (
    <Panel>
      <h2 className="sr-only">معلومات التواصل والخبرة</h2>

      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {featuredExperience && featuredPosition && (
          <div className="sm:col-start-1 sm:row-start-1">
            <JobItem
              title={featuredPosition.title}
              company={featuredExperience.companyName}
              website={featuredExperience.companyWebsite ?? ""}
              experienceId={featuredExperience.id}
            />
          </div>
        )}

        <IntroItem className="font-sans sm:col-start-1 sm:row-start-2">
          <IntroItemIcon>
            <MapPinIcon />
          </IntroItemIcon>
          <IntroItemContent dir="auto">
            <IntroItemLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
              aria-label={`الموقع: ${user.address}`}
              dir="auto"
            >
              {user.address}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <div className="sm:col-start-2 sm:row-start-1">
          <CurrentLocalTimeItem
            timeZone={USER.timeZone}
            locationName={user.address.split("،")[0]}
          />
        </div>

        <div className="sm:col-start-1 sm:row-start-3">
          <EmailItem emailB64={USER.emailB64} />
        </div>

        <div className="sm:col-start-2 sm:row-start-2">
          <PhoneItem phoneNumberB64={USER.phoneNumberB64} />
        </div>

        <IntroItem className="font-sans sm:col-start-2 sm:row-start-3">
          <IntroItemIcon aria-hidden>
            <span className="size-2 rounded-full bg-emerald-500" />
          </IntroItemIcon>
          <IntroItemContent
            className="min-w-0 flex-1 text-right text-[0.8rem]"
            role="status"
          >
            متاح لمشاريع جديدة
          </IntroItemContent>
        </IntroItem>

        {/* <IntroItem>
          <IntroItemIcon>
            <LinkIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={USER.website}
              aria-label={`Personal website: ${urlToName(USER.website)}`}
            >
              {urlToName(USER.website)}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem> */}

        {/* <IntroItem>
          <IntroItemIcon>{getGenderIcon(USER.gender)}</IntroItemIcon>
          <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
            {USER.pronouns}
          </IntroItemContent>
        </IntroItem> */}
      </PanelContent>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-px -translate-x-1/2 border-r border-dashed border-line max-sm:hidden" />
    </Panel>
  )
}

// function getGenderIcon(gender: User["gender"]) {
//   switch (gender) {
//     case "male":
//       return <MarsIcon />
//     case "female":
//       return <VenusIcon />
//     case "non-binary":
//       return <NonBinaryIcon />
//   }
// }
