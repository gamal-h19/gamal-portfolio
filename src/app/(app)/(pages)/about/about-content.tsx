import Image from "next/image"

import { Tag } from "@/components/ui/tag"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  Foldable,
  FoldableCover,
  FoldableInsideLeft,
  FoldableInsideRight,
  FoldableSlider,
  FoldableStage,
} from "@/registry/components/foldable"
import { Education } from "@/features/portfolio/components/education"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { Recognition } from "@/features/portfolio/components/recognition"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { WorkProcess } from "@/features/portfolio/components/work-process"

const INTERESTS = [
  "التصميم والتفكير الإبداعي",
  "استراتيجية المنتجات",
  "ريادة الأعمال",
  "الذكاء الاصطناعي",
  "علم النفس السلوكي",
  "حل المشكلات",
  "بناء المنتجات الرقمية",
  "التعلم المستمر",
]

const HOBBIES = ["استكشاف التقنيات الجديدة", "مشاركة المعرفة"]

const STORY_SECTIONS = [
  {
    title: "من التصميم إلى المنتج",
    text: "بدأت بالبحث وتصميم التجربة، ثم توسع دوري إلى إدارة المنتج: تحديد المشكلة، ترتيب الأولويات، وربط التصميم بهدف واضح.",
  },
  {
    title: "كيف أبني المنتجات اليوم",
    text: "أبدأ بفهم المستخدم وسياق العمل، ثم أختبر الحل مع الفريق وأحسّنه. أركز على منتج مفهوم، قابل للتنفيذ، ويقدم فائدة حقيقية.",
  },
]

const PROFESSIONAL_STORY = STORY_SECTIONS.map(({ text }) => text).join(" ")

export function AboutContent() {
  return (
    <div className="flex flex-col font-eight font-features-['ss01','zero']">
      <PageHeading>
        <PageHeadingTagline>عنّي</PageHeadingTagline>
        <PageHeadingTitle>قصتي المهنية</PageHeadingTitle>
      </PageHeading>

      <p className="sr-only">{PROFESSIONAL_STORY}</p>

      <Foldable
        dir="ltr"
        className="[--foldable-radius:--spacing(3)] [--foldable-surface:var(--card)] [--foldable-w:min(22rem,calc(50vw-0.75rem))]"
      >
        <FoldableStage className="@container/foldable max-[28rem]:[--foldable-h:calc(var(--foldable-w)*1.5)] max-[26rem]:[--foldable-h:calc(var(--foldable-w)*1.55)] max-[24rem]:[--foldable-h:calc(var(--foldable-w)*1.75)] max-[22rem]:[--foldable-h:calc(var(--foldable-w)*2.2)]">
          <FoldableInsideRight>
            <StoryPanel section={STORY_SECTIONS[0]} />
          </FoldableInsideRight>

          <FoldableCover>
            <div
              dir="rtl"
              className="flex size-full flex-col justify-between p-5 @max-xs/foldable:p-3"
            >
              <Image
                src="/images/gamal-portrait.jpg"
                alt=""
                width={56}
                height={56}
                draggable={false}
                className="size-14 rounded-full border object-cover @max-xs/foldable:size-11"
              />

              <div className="flex flex-col gap-1">
                <p className="text-xl font-medium tracking-tight @max-xs/foldable:text-base">
                  جمال حسن
                </p>
                <p className="text-xs text-muted-foreground @max-xs/foldable:text-[11px]">
                  مصمم تجربة مستخدم ومدير منتجات
                </p>
                <p className="text-xs text-muted-foreground @max-xs/foldable:text-[11px]">
                  أبحاث المستخدم · استراتيجية المنتج · النمو
                </p>
              </div>
            </div>
          </FoldableCover>

          <FoldableInsideLeft>
            <StoryPanel section={STORY_SECTIONS[1]} />
          </FoldableInsideLeft>
        </FoldableStage>

        <FoldableSlider
          dir="rtl"
          label="حرّك المؤشر لفتح البطاقة وإغلاقها"
          className="w-[min(18rem,calc(100vw-2rem))] md:-translate-y-20"
        />
      </Foldable>

      <div className="mt-6">
        <WorkProcess />
      </div>

      <TechStack />

      <Education />

      <Recognition />

      <Panel id="initiatives">
        <PanelHeader>
          <PanelTitle>مبادراتي</PanelTitle>
        </PanelHeader>

        <div className="grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
          <Initiative
            title="أكاديمية سند"
            description="تعليم البرمجة والذكاء الاصطناعي بمشروعات تطبيقية تساعد المتعلمين على بناء مهاراتهم."
            tags={["التعلم بالممارسة", "البرمجة", "الذكاء الاصطناعي"]}
          />
          <Initiative
            title="استوديو سند الرقمي"
            description="تحويل احتياجات المؤسسات إلى مواقع ومنتجات رقمية سهلة الاستخدام."
            tags={["تطوير البرمجيات", "تجربة المستخدم", "الهوية الرقمية"]}
          />
        </div>
      </Panel>

      <Panel id="interests">
        <PanelHeader>
          <PanelTitle>ما يلهمني</PanelTitle>
        </PanelHeader>
        <PanelContent className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              مواضيع أتابعها
            </h3>
            <TagList items={INTERESTS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              في وقت فراغي
            </h3>
            <TagList items={HOBBIES} />
          </div>
        </PanelContent>
      </Panel>
    </div>
  )
}

function StoryPanel({ section }: { section: (typeof STORY_SECTIONS)[number] }) {
  return (
    <div
      dir="rtl"
      className="flex size-full flex-col gap-4 p-4 font-sans @max-xs/foldable:gap-1.5 @max-xs/foldable:px-2 @max-xs/foldable:py-1.5"
    >
      <h2 className="text-lg/6 font-semibold tracking-tight @max-xs/foldable:text-sm/5">
        {section.title}
      </h2>
      <p className="text-base/relaxed text-muted-foreground max-[24rem]:text-xs/[1.4]! @max-xs/foldable:text-[13px]/[1.4]">
        {section.text}
      </p>
    </div>
  )
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag className="font-sans">{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

function Initiative({
  title,
  description,
  tags,
}: {
  title: string
  description: string
  tags: string[]
}) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag className="font-sans text-xs">{tag}</Tag>
          </li>
        ))}
      </ul>
    </div>
  )
}
