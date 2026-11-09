"use client"

import { Markdown } from "@/components/markdown"
import { HelloTitle } from "@/features/portfolio/components/hello-title"
import {
  Panel,
  PanelContent,
  PanelHeader,
} from "@/features/portfolio/components/panel"
import { USER_AR } from "@/features/portfolio/data/user-ar"

const ID = "hello"

export function Hello() {
  const user = USER_AR

  const aboutContent = user.aboutPoints.map((p) => `- ${p}`).join("\n")

  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <h2 className="sr-only">نبذة عني</h2>
        <HelloTitle />
      </PanelHeader>

      <PanelContent>
        <div className="typeset typeset-description [&_li]:ps-0.5 [&_ul]:ps-3.5">
          <Markdown>{aboutContent}</Markdown>
        </div>
      </PanelContent>

      <div className="screen-line-bottom h-px" />
      <div className="h-4" />
      <div className="screen-line-bottom h-px" />
    </Panel>
  )
}
