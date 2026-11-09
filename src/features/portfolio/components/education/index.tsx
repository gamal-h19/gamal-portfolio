import { useLanguage } from "@/lib/i18n/language-context"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { EDUCATION_AR } from "@/features/portfolio/data/education-ar"

import { EducationItem } from "./education-item"

const ID = "education"

export function Education({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLanguage()
  const educationList = EDUCATION_AR
  const items = educationList.map((item) => (
    <div
      key={item.id}
      id={`education-${item.id}`}
      className="screen-line-bottom scroll-mt-14 p-4"
    >
      <EducationItem item={item} />
    </div>
  ))

  if (embedded) {
    return <>{items}</>
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{t("section.education")}</a>
        </PanelTitle>
      </PanelHeader>

      {items}
    </Panel>
  )
}
