import { PanelTitle } from "@/features/portfolio/components/panel"

const ID = "hello"

export function HelloTitle() {
  return (
    <PanelTitle as="div" id={`${ID}-greeting`} aria-hidden>
      اهلا اهلا 👋
    </PanelTitle>
  )
}
