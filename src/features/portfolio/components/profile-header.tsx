"use client"

import Image from "next/image"

import { USER_AR } from "@/features/portfolio/data/user-ar"

import { DiameterDimension } from "./diameter-dimension"
import { ProfileTaglines } from "./profile-taglines"

export function ProfileHeader() {
  const user = USER_AR

  return (
    <div
      dir="rtl"
      className="group/profile-header screen-line-top screen-line-bottom relative overflow-y-clip border-x border-x-line after:z-1"
    >
      {/* Main Profile Info Header */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] overflow-y-clip">
        <div className="flex flex-col">
          <div className="mt-auto shrink-0 border-e border-line">
            <div className="-mx-px my-0 flex outline-none">
              <div className="relative z-10 size-28 overflow-hidden rounded-full border border-line bg-muted/60 text-foreground select-none min-[24rem]:size-32 sm:size-36">
                <Image
                  src="/images/gamal-portrait.jpg"
                  alt="صورة شخصية لجمال حسن"
                  fill
                  sizes="(max-width: 24rem) 112px, (max-width: 640px) 128px, 144px"
                  preload
                  className="object-cover object-[58%_35%] grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/profile-header:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-border" />
                <DiameterDimension
                  className="-z-1 hidden lg:block"
                  diameter={144}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-end">
          <div className="z-1 border-t border-line">
            <div className="flex translate-x-px items-center gap-2 px-4 py-2">
              <h1 className="max-w-full min-w-0 -translate-y-px font-eight font-features-['ss01','zero'] text-xl leading-[1.2] font-medium tracking-[0.5px] text-balance wrap-break-word sm:text-[1.65rem]">
                أهلًا، أنا {user.displayName} 👋
              </h1>
            </div>

            <div className="flex items-center gap-2 border-t border-line px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="font-medium text-foreground">
                {user.jobTitle}
              </span>
            </div>

            <ProfileTaglines className="h-10 border-t border-line px-4 py-1 sm:h-9">
              {user.taglines}
            </ProfileTaglines>
          </div>
        </div>
      </div>
    </div>
  )
}
