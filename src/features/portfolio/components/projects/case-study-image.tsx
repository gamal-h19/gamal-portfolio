import Image from "next/image"

import { MockupFrame } from "@/features/blocks/components/mockups/mockup-frame"

export function CaseStudyImage({
  src,
  alt = "",
  brandLogo,
  brandColor,
}: {
  src: string
  alt?: string
  brandLogo: string
  brandColor: string
}) {
  return (
    <div className="relative select-none [--image-radius:var(--radius-xl)]">
      <MockupFrame className="rounded-(--image-radius)" dir="ltr">
        <img
          className="size-full object-contain"
          src={src}
          alt={alt}
          aria-hidden={alt ? undefined : true}
        />
      </MockupFrame>
      <div
        className="absolute top-3 left-3 z-10 flex size-14 items-center justify-center rounded-lg border backdrop-blur-sm"
        style={{
          backgroundColor: `${brandColor}1a`,
          borderColor: `${brandColor}66`,
        }}
      >
        <Image
          src={brandLogo}
          alt=""
          aria-hidden
          width={40}
          height={40}
          className="size-10 object-contain"
          unoptimized
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15" />
    </div>
  )
}
