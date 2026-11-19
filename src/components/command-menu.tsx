"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { useRouter } from "@bprogress/next/app"
import { useTiks } from "@rexa-developer/tiks/react"
import {
  AwardIcon,
  BoxIcon,
  BriefcaseBusinessIcon,
  CalendarCheckIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  FileTextIcon,
  GraduationCapIcon,
  LayersIcon,
  MailIcon,
  MonitorIcon,
  MoonStarIcon,
  RssIcon,
  SunMediumIcon,
  TextInitialIcon,
  TypeIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"

import { trackEvent } from "@/lib/events"
import { useLanguage } from "@/lib/i18n/language-context"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { toast } from "@/components/ui/toast"
import type { DocPreview } from "@/features/doc/types/document"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

import { ChanhDaiMark, getMarkSVG } from "./chanhdai-mark"
import { getWordmarkSVG } from "./chanhdai-wordmark"
import { NewsIcon, SearchIcon } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"

type CommandKind = "command" | "page" | "link" | "bookmark"

type CommandLinkItem = {
  title: string
  href: string
  kind: CommandKind
  icon?: React.ReactElement
  iconImage?: string
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    kind: "page",
    icon: <ChanhDaiMark />,
    shortcut: "GH",
  },
  {
    title: "About",
    href: "/about",
    kind: "page",
    icon: <TextInitialIcon />,
    shortcut: "GA",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    kind: "page",
    icon: <BoxIcon />,
    shortcut: "GW",
  },
  {
    title: "Blog",
    href: "/blog",
    kind: "page",
    icon: <NewsIcon />,
    shortcut: "GL",
  },
  {
    title: "Newsletter",
    href: "/newsletter",
    kind: "page",
    icon: <FileTextIcon />,
    shortcut: "GN",
  },
  {
    title: "Consultation",
    href: "/consultation",
    kind: "page",
    icon: <CalendarCheckIcon />,
  },
  {
    title: "Contact",
    href: "/contact",
    kind: "page",
    icon: <MailIcon />,
    shortcut: "GX",
  },
]

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "Hello",
    href: "/#hello",
    kind: "page",
    icon: <TextInitialIcon />,
  },
  {
    title: "Stack",
    href: "/#stack",
    kind: "page",
    icon: <LayersIcon />,
  },
  {
    title: "Experience",
    href: "/#experience",
    kind: "page",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Selected work",
    href: "/#selected-work",
    kind: "page",
    icon: <BoxIcon />,
  },
  {
    title: "Education",
    href: "/about#education",
    kind: "page",
    icon: <GraduationCapIcon />,
  },
  {
    title: "Certifications",
    href: "/about#recognition",
    kind: "page",
    icon: <AwardIcon />,
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  kind: "link",
  icon: SOCIAL_ICONS[item.name],
  openInNewTab: true,
}))

const OTHER_LINK_ITEMS: CommandLinkItem[] = [
  {
    title: "Download vCard",
    href: "/vcard",
    kind: "command",
    icon: <DownloadIcon />,
  },
  {
    title: "llms.txt",
    href: "/llms.txt",
    kind: "link",
    icon: <FileTextIcon />,
    openInNewTab: true,
  },
  {
    title: "RSS Feed",
    href: "/blog/rss",
    kind: "link",
    icon: <RssIcon />,
    openInNewTab: true,
  },
]

const AR_MENU_TITLES: Record<string, string> = {
  "/": "الرئيسية",
  "/about": "عنّي",
  "/case-studies": "دراسات الحالة",
  "/blog": "مقالاتي",
  "/newsletter": "النشرة",
  "/consultation": "استشارة",
  "/contact": "تواصل",
}

const AR_PORTFOLIO_TITLES: Record<string, string> = {
  "/#hello": "نبذة عنّي",
  "/#stack": "المهارات والأدوات",
  "/#experience": "رحلتي المهنية",
  "/#selected-work": "مشروعاتي",
  "/about#education": "التعليم",
  "/about#recognition": "التقدير المهني",
}

const AR_OTHER_TITLES: Record<string, string> = {
  "/vcard": "تنزيل بطاقة التواصل",
  "/llms.txt": "llms.txt",
  "/blog/rss": "خلاصة RSS",
}

export function CommandMenu({
  docs,
  enabledHotkeys = false,
}: {
  docs: DocPreview[]
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [selectedCommandKind, setSelectedCommandKind] =
    useState<CommandKind | null>(null)

  const [click] = useClickSound()

  const { success: tiksSuccess } = useTiks()
  const { t } = useLanguage()
  const menuLinks = MENU_LINKS.map((link) => ({
    ...link,
    title: AR_MENU_TITLES[link.href] ?? link.title,
  }))
  const portfolioLinks = PORTFOLIO_LINKS.map((link) => ({
    ...link,
    title: AR_PORTFOLIO_TITLES[link.href] ?? link.title,
  }))
  const otherLinks = OTHER_LINK_ITEMS.map((link) => ({
    ...link,
    title: AR_OTHER_TITLES[link.href] ?? link.title,
  }))

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((open) => {
        if (!open) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
              key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
            },
          })
        }
        return !open
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      })

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const handleCopyText = useCallback(
    (text: string, message: string) => {
      setOpen(false)
      copyToClipboardWithEvent(text, {
        name: "command_menu_action",
        properties: {
          action: "copy",
          text: text,
        },
      })
      toast.add({ type: "success", title: message })
      tiksSuccess()
    },
    [tiksSuccess]
  )

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      click()
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      })

      setTheme(theme)
    },
    [click, setTheme]
  )

  const blogLinks = useMemo(
    () =>
      docs
        .filter((doc) => doc.category === "blog")
        .map<CommandLinkItem>((doc) => ({
          title: doc.title,
          href: `/blog/${doc.slug}`,
          kind: "page",
          keywords: ["blog"],
        })),
    [docs]
  )

  const handleLinkHighlight = useCallback((link: CommandLinkItem) => {
    setSelectedCommandKind(link.kind)
  }, [])

  const handleCommandHighlight = useCallback(() => {
    setSelectedCommandKind("command")
  }, [])

  return (
    <>
      <CommandMenuTrigger
        title={t("command.trigger")}
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <div className="rounded-xl bg-background ring-1 ring-border">
          <CommandList className="min-h-80 scroll-fade">
            <CommandEmpty>{t("command.noResults")}</CommandEmpty>

            <CommandLinkGroup
              heading={t("command.menu")}
              links={menuLinks}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading={t("command.portfolio")}
              links={portfolioLinks}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading={t("command.blog")}
              links={blogLinks}
              fallbackIcon={<NewsIcon />}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading={t("command.socialLinks")}
              links={SOCIAL_LINK_ITEMS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandGroup heading={t("command.brandAssets")}>
              <CommandMenuItem
                onHighlight={handleCommandHighlight}
                onSelect={() => {
                  handleCopyText(getMarkSVG(), t("command.markCopied"))
                }}
              >
                <ChanhDaiMark />
                نسخ العلامة بصيغة SVG
              </CommandMenuItem>

              <CommandMenuItem
                onHighlight={handleCommandHighlight}
                onSelect={() => {
                  handleCopyText(getWordmarkSVG(), t("command.logotypeCopied"))
                }}
              >
                <TypeIcon />
                نسخ الشعار بصيغة SVG
              </CommandMenuItem>
            </CommandGroup>

            <CommandGroup heading={t("command.theme")}>
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("light")}
              >
                <SunMediumIcon />
                {t("command.light")}
              </CommandMenuItem>
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("dark")}
              >
                <MoonStarIcon />
                {t("command.dark")}
              </CommandMenuItem>
              <CommandMenuItem
                keywords={["theme"]}
                onHighlight={handleCommandHighlight}
                onSelect={createThemeHandler("system")}
              >
                <MonitorIcon />
                {t("command.system")}
              </CommandMenuItem>
            </CommandGroup>

            <CommandLinkGroup
              heading={t("command.other")}
              links={otherLinks}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />
          </CommandList>
        </div>

        <CommandMenuFooter selectedCommandKind={selectedCommandKind} />
      </CommandDialog>
    </>
  )
}

export default CommandMenu

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  const { t } = useLanguage()

  return (
    <Button
      data-slot="command-menu-trigger"
      className="gap-1.5 border-none px-1.5 text-muted-foreground will-change-[scale] select-none"
      variant="ghost"
      size="sm"
      {...props}
    >
      <SearchIcon />

      <span className="font-sans text-sm/4 font-medium sm:sr-only">
        {t("command.trigger")}
      </span>

      {/* Tablets rarely have a keyboard, and the header has no room for the
      hint until md. */}
      <KbdGroup className="hidden gap-0.75 md:in-[.os-macos_&]:flex">
        <Kbd className="w-5 min-w-auto">⌘</Kbd>
        <Kbd className="w-5 min-w-auto">K</Kbd>
      </KbdGroup>

      <KbdGroup className="hidden gap-0.75 md:not-[.os-macos_&]:flex">
        <Kbd>Ctrl</Kbd>
        <Kbd className="w-5 min-w-auto">K</Kbd>
      </KbdGroup>
    </Button>
  )
}

function CommandMenuInput() {
  const { t } = useLanguage()
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "command_menu_search",
          properties: {
            query: searchValue,
            query_length: searchValue.length,
          },
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [searchValue])

  return (
    <CommandInput
      placeholder={t("command.searchPlaceholder")}
      value={searchValue}
      onValueChange={setSearchValue}
    />
  )
}

function CommandMenuItem({
  children,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem ref={ref} {...props}>
      {children}
    </CommandItem>
  )
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkHighlight,
  onLinkSelect,
}: {
  heading: string
  links: CommandLinkItem[]
  fallbackIcon?: React.ReactElement
  onLinkHighlight: (link: CommandLinkItem) => void
  onLinkSelect: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const icon = link?.icon ?? fallbackIcon ?? <React.Fragment />

        return (
          <CommandMenuItem
            key={link.href}
            keywords={link.keywords}
            onHighlight={() => onLinkHighlight(link)}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <img
                className="size-4 rounded-sm"
                src={link.iconImage}
                alt={link.title}
              />
            ) : (
              icon
            )}

            <p className="line-clamp-1">{link.title}</p>

            {link.shortcut && (
              <CommandShortcut className="font-mono tracking-[0.2em] max-sm:hidden">
                {link.shortcut}
              </CommandShortcut>
            )}
          </CommandMenuItem>
        )
      })}
    </CommandGroup>
  )
}

function CommandMenuFooter({
  selectedCommandKind,
}: {
  selectedCommandKind: CommandKind | null
}) {
  const { t } = useLanguage()
  const enterActionLabels: Record<CommandKind, string> = {
    command: t("command.runCommand"),
    page: t("command.goToPage"),
    link: t("command.openLink"),
    bookmark: t("command.openBookmark"),
  }

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 rounded-b-2xl px-4 text-xs font-medium">
        <ChanhDaiMark className="size-6 text-muted-foreground" />

        <div className="flex items-center gap-2 max-sm:hidden">
          <span>{enterActionLabels[selectedCommandKind ?? "page"]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
        </div>
      </div>
    </>
  )
}
