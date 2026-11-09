"use client"

import { ArrowLeftIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"
import { Panel, PanelContent } from "@/features/portfolio/components/panel"

export function HomeCTA() {
  return (
    <Panel id="contact-cta">
      <PanelContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <h2 className="font-eight font-features-['ss01','zero'] text-xl font-medium tracking-[0.5px]">
          هل تريد تطوير تجربة منتجك؟
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          نبدأ بفهم احتياج المستخدم، ثم نحدد تحسينًا واضحًا يمكن لفريقك تنفيذه.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="sm"
            variant="default"
            className="gap-2"
            nativeButton={false}
            render={<a href="mailto:gamal.htg@gmail.com" />}
          >
            <MailIcon className="size-4" />
            راسلني عن مشروعك
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="gap-2"
            nativeButton={false}
            render={<AppLink href="/about" />}
          >
            تعرّف على خبرتي
            <ArrowLeftIcon className="size-4" />
          </Button>
        </div>
      </PanelContent>
    </Panel>
  )
}
