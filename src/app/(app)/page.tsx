import type { Metadata } from "next"
import type { ProfilePage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import { SectionMinimap } from "@/components/section-minimap"
import { Experiences } from "@/features/portfolio/components/experiences"
import { FrameWidthDimension } from "@/features/portfolio/components/frame-width-dimension"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SeparatorHeightDimension } from "@/features/portfolio/components/separator-height-dimension"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { Testimonials } from "@/features/portfolio/components/testimonials"
import { WorkProcess } from "@/features/portfolio/components/work-process"
import { USER } from "@/features/portfolio/data/user"

import { HomeCTA } from "./home-cta"

export const metadata: Metadata = {
  title: "تصميم تجربة المستخدم وإدارة المنتجات",
  description:
    "مصمم تجربة مستخدم ومدير منتجات في القاهرة. أبحث احتياجات الناس وأحوّلها إلى تجارب رقمية واضحة لقطاعات التعليم والرعاية والخدمات القانونية.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "جمال حسن",
    "مصمم تجربة مستخدم",
    "مدير منتجات",
    "أبحاث المستخدمين",
    "استراتيجية المنتجات",
    "تصميم تجربة المستخدم",
    "إدارة المنتجات الرقمية",
    "دراسات حالة",
    "محفظة أعمال",
  ],
  openGraph: {
    title: "جمال حسن | تصميم تجربة المستخدم وإدارة المنتجات",
    description:
      "أبحث احتياجات الناس وأحوّلها إلى تجارب رقمية واضحة لقطاعات التعليم والرعاية والخدمات القانونية.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "جمال حسن | تصميم تجربة المستخدم وإدارة المنتجات",
    description:
      "أبحث احتياجات الناس وأحوّلها إلى تجارب رقمية واضحة لقطاعات التعليم والرعاية والخدمات القانونية.",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />

      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div className="mx-auto md:max-w-3xl">
          <FrameWidthDimension />
          <ProfileHeader />

          <Separator>
            <SeparatorHeightDimension className="hidden lg:block" height={32} />
          </Separator>

          <Overview />
          <SocialLinks />
          <Separator />
          <GitHubContributions />
          <Separator />

          <Projects />
          <Separator />

          <Experiences />
          <Separator />

          <WorkProcess />
          <Separator />

          <Testimonials />
          <Separator />

          <HomeCTA />
        </div>
      </div>
      <SectionMinimap />
    </>
  )
}

function getProfilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

function Separator({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-x-line",
        className
      )}
    >
      {children}
    </div>
  )
}
