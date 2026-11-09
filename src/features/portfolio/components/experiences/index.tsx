"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { EXPERIENCES_AR } from "@/features/portfolio/data/experiences-ar"
import type { Experience } from "@/features/portfolio/types/experiences"

import { ExperienceItem } from "./experience-item"

const ID = "experience"

export function Experiences() {
  const { t } = useLanguage()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{t("section.experience")}</a>
        </PanelTitle>
      </PanelHeader>

      <div className="px-4">
        <ExperienceList experiences={EXPERIENCES_AR} />
      </div>
    </Panel>
  )
}

function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </>
  )
}
