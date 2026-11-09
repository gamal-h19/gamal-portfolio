"use client"

import { Markdown } from "@/components/markdown"
import {
  TimescaleAge,
  TimescaleContent,
  TimescaleHeader,
  TimescaleIntroScroll,
  TimescaleItem,
  TimescaleRail,
  TimescaleRoot,
  TimescaleTick,
  TimescaleTrack,
  TimescaleViewport,
  TimescaleYear,
} from "@/registry/components/timescale"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { WORK_MILESTONES } from "@/features/portfolio/data/work-milestones"

export function WorkProcess() {
  return (
    <Panel id="work-process">
      <PanelHeader>
        <PanelTitle>
          <span>من الفهم إلى التحسين</span>
        </PanelTitle>
      </PanelHeader>
      <PanelContent className="pt-2">
        <TimescaleIntroScroll>
          <TimescaleRoot dir="rtl" className="mt-4 [direction:rtl]">
            <TimescaleHeader
              style={{ left: "auto", right: 0 }}
              className="text-right"
            >
              <TimescaleAge style={{ textAlign: "right" }}>الخطوة</TimescaleAge>
              <TimescaleYear style={{ textAlign: "right" }}>
                المرحلة
              </TimescaleYear>
            </TimescaleHeader>

            <TimescaleViewport
              style={{ paddingInlineStart: 0, paddingInlineEnd: "5rem" }}
            >
              <TimescaleTrack style={{ direction: "rtl" }}>
                <TimescaleRail />

                {WORK_MILESTONES.map((milestone) => (
                  <TimescaleItem key={milestone.step}>
                    <TimescaleTick style={{ right: 0, left: "auto" }} />

                    <TimescaleAge style={{ textAlign: "right" }}>
                      {milestone.step}
                    </TimescaleAge>
                    <TimescaleYear style={{ textAlign: "right" }}>
                      {milestone.phase}
                    </TimescaleYear>

                    <TimescaleContent
                      className="typeset typeset-timescale"
                      style={{ textAlign: "right" }}
                    >
                      <Markdown>{milestone.content}</Markdown>
                    </TimescaleContent>
                  </TimescaleItem>
                ))}
              </TimescaleTrack>
            </TimescaleViewport>
          </TimescaleRoot>
        </TimescaleIntroScroll>
      </PanelContent>
    </Panel>
  )
}
