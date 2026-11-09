import { CollapsibleList } from "@/components/collapsible-list"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { RECOGNITION } from "@/features/portfolio/data/recognition"

import { RecognitionItem } from "./recognition-item"

const ID = "recognition"

export function Recognition() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>التقدير المهني</a>
          <PanelTitleSup>({RECOGNITION.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={RECOGNITION}
        max={4}
        keyExtractor={(entry) => entry.key}
        renderItem={(entry) => <RecognitionItem entry={entry} />}
      />
    </Panel>
  )
}
