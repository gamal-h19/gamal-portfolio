import Image from "next/image"
import { IconBrandOffice } from "@tabler/icons-react"
import {
  ActivityIcon,
  BotIcon,
  BrainCircuitIcon,
  CheckCircle2Icon,
  CompassIcon,
  KanbanIcon,
  LayersIcon,
  LineChartIcon,
  ListTodoIcon,
  MapIcon,
  MilestoneIcon,
  PenToolIcon,
  PieChartIcon,
  RepeatIcon,
  SearchIcon,
  SlidersIcon,
  SparklesIcon,
  TargetIcon,
  TestTubeIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import type { TechStack } from "../types/tech-stack"

export const TECH_STACK: TechStack[] = [
  // UX & Research
  {
    key: "user-research",
    title: "User Research",
    href: "https://www.nngroup.com/articles/which-ux-research-methods/",
    icon: <SearchIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "customer-journey",
    title: "Customer Journey Mapping",
    href: "https://www.nngroup.com/articles/customer-journey-mapping/",
    icon: <MapIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "info-architecture",
    title: "Information Architecture",
    href: "https://www.nngroup.com/articles/ia-study-guide/",
    icon: <LayersIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "usability-testing",
    title: "Usability Testing",
    href: "https://www.nngroup.com/articles/usability-testing-101/",
    icon: <TestTubeIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "sus-evaluation",
    title: "SUS Evaluation",
    href: "https://measuringu.com/sus/",
    icon: <CheckCircle2Icon />,
    categories: ["UX & Research"],
  },
  {
    key: "heuristic-evaluation",
    title: "Heuristic Evaluation",
    href: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    icon: <SlidersIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "service-design",
    title: "Service Design",
    href: "https://www.nngroup.com/articles/service-design-101/",
    icon: <CompassIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "ux-audit",
    title: "UX Audit",
    href: "https://www.nngroup.com/articles/ux-expert-reviews/",
    icon: <SearchIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "ux-writing",
    title: "UX Writing Systems",
    href: "https://uxdesign.cc/ux-writing/home",
    icon: <PenToolIcon />,
    categories: ["UX & Research"],
  },
  {
    key: "design-reviews",
    title: "Design Reviews",
    href: "https://www.nngroup.com/articles/design-critiques/",
    icon: <UsersIcon />,
    categories: ["UX & Research"],
  },

  // Product Management
  {
    key: "product-discovery",
    title: "Product Discovery",
    href: "https://www.svpg.com/product-discovery/",
    icon: <CompassIcon />,
    categories: ["Product Management"],
  },
  {
    key: "problem-framing",
    title: "Problem Framing",
    href: "https://hbr.org/2017/01/are-you-solving-the-right-problems",
    icon: <TargetIcon />,
    categories: ["Product Management"],
  },
  {
    key: "opportunity-assessment",
    title: "Opportunity Assessment",
    href: "https://www.svpg.com/assessing-product-opportunities/",
    icon: <SparklesIcon />,
    categories: ["Product Management"],
  },
  {
    key: "rice-prioritization",
    title: "RICE Prioritization",
    href: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/",
    icon: <SlidersIcon />,
    categories: ["Product Management"],
  },
  {
    key: "product-roadmapping",
    title: "Product Roadmapping",
    href: "https://www.atlassian.com/agile/product-management/product-roadmaps",
    icon: <MilestoneIcon />,
    categories: ["Product Management"],
  },
  {
    key: "backlog-management",
    title: "Backlog Management",
    href: "https://www.atlassian.com/agile/scrum/backlogs",
    icon: <ListTodoIcon />,
    categories: ["Product Management"],
  },
  {
    key: "user-stories",
    title: "User Stories & Acceptance Criteria",
    href: "https://www.atlassian.com/agile/project-management/user-stories",
    icon: <CheckCircle2Icon />,
    categories: ["Product Management"],
  },
  {
    key: "mvp-definition",
    title: "MVP Definition",
    href: "https://www.ycombinator.com/library/4Q-how-to-plan-an-mvp",
    icon: <TargetIcon />,
    categories: ["Product Management"],
  },
  {
    key: "sprint-planning",
    title: "Sprint Planning",
    href: "https://www.atlassian.com/agile/scrum/sprint-planning",
    icon: <KanbanIcon />,
    categories: ["Product Management"],
  },
  {
    key: "stakeholder-alignment",
    title: "Stakeholder Alignment",
    href: "https://www.mindtheproduct.com/stakeholder-management-for-product-managers/",
    icon: <UsersIcon />,
    categories: ["Product Management"],
  },

  // Data & Growth
  {
    key: "heart-framework",
    title: "HEART Framework",
    href: "https://library.gv.com/how-to-choose-the-right-ux-metrics-for-your-product-5f4605f2174f",
    icon: <ActivityIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "aarrr-framework",
    title: "AARRR Framework",
    href: "https://500.co/the-real-meaning-of-growth-hacking-aarrr",
    icon: <TrendingUpIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "product-lifecycle",
    title: "Product Lifecycle",
    href: "https://www.productplan.com/glossary/product-life-cycle/",
    icon: <RepeatIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "nps-csat",
    title: "NPS & CSAT",
    href: "https://www.qualtrics.com/experience-management/customer/net-promoter-score/",
    icon: <PieChartIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "funnel-analysis",
    title: "Funnel Analysis",
    href: "https://mixpanel.com/topics/funnel-analysis/",
    icon: <LineChartIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "cro",
    title: "Conversion Rate Optimization",
    href: "https://optimizely.com/optimization-glossary/conversion-rate-optimization/",
    icon: <TrendingUpIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "plg",
    title: "Product-Led Growth",
    href: "https://productled.com/",
    icon: <ZapIcon />,
    categories: ["Data & Growth"],
  },
  {
    key: "churn-analysis",
    title: "Churn Analysis",
    href: "https://baremetrics.com/academy/churn-analysis",
    icon: <ActivityIcon />,
    categories: ["Data & Growth"],
  },

  // AI & Systems
  {
    key: "prompt-engineering",
    title: "Prompt Engineering",
    href: "https://learnprompting.org/",
    icon: <BrainCircuitIcon />,
    categories: ["AI & Systems"],
  },
  {
    key: "ai-workflows",
    title: "AI Workflow Design",
    href: "https://openai.com/",
    icon: <BotIcon />,
    categories: ["AI & Systems"],
  },

  // Tools
  {
    key: "figma",
    title: "Figma",
    href: "https://figma.com",
    icon: <ToolLogo src="/images/tool-logos/figma.svg" />,
    categories: ["Tools"],
  },
  {
    key: "figjam",
    title: "FigJam",
    href: "https://figma.com/figjam",
    icon: <ToolLogo src="/images/tool-logos/figma.svg" />,
    categories: ["Tools"],
  },
  {
    key: "miro",
    title: "Miro",
    href: "https://miro.com",
    icon: <ToolLogo src="/images/tool-logos/miro.svg" />,
    categories: ["Tools"],
  },
  {
    key: "google-analytics",
    title: "Google Analytics",
    href: "https://analytics.google.com",
    icon: <ToolLogo src="/images/tool-logos/google-analytics.svg" />,
    categories: ["Tools"],
  },
  {
    key: "hotjar",
    title: "Hotjar",
    href: "https://hotjar.com",
    icon: <ToolLogo src="/images/tool-logos/hotjar.svg" />,
    categories: ["Tools"],
  },
  {
    key: "notion",
    title: "Notion",
    href: "https://notion.so",
    icon: <ToolLogo src="/images/tool-logos/notion.svg" darkInvert />,
    categories: ["Tools"],
  },
  {
    key: "maze",
    title: "Maze",
    href: "https://maze.co",
    icon: <ToolLogo src="/images/tool-logos/maze.svg" darkInvert />,
    categories: ["Tools"],
  },
  {
    key: "jira",
    title: "Jira",
    href: "https://www.atlassian.com/software/jira",
    icon: <ToolLogo src="/images/tool-logos/jira.svg" />,
    categories: ["Tools"],
  },
  {
    key: "asana",
    title: "Asana",
    href: "https://asana.com",
    icon: <ToolLogo src="/images/tool-logos/asana.svg" />,
    categories: ["Tools"],
  },
  {
    key: "excel",
    title: "Excel",
    href: "https://microsoft.com/excel",
    icon: <IconBrandOffice className="size-3.5 text-[#217346]" />,
    categories: ["Tools"],
  },

  // Methods
  {
    key: "agile",
    title: "Agile",
    href: "https://agilemanifesto.org/",
    icon: <RepeatIcon />,
    categories: ["Methods"],
  },
  {
    key: "scrum",
    title: "Scrum",
    href: "https://www.scrum.org/",
    icon: <KanbanIcon />,
    categories: ["Methods"],
  },
  {
    key: "design-sprint",
    title: "Design Sprint",
    href: "https://www.thesprintbook.com/",
    icon: <ZapIcon />,
    categories: ["Methods"],
  },
  {
    key: "lean-ux",
    title: "Lean UX",
    href: "https://leanuxbook.com/",
    icon: <TrendingUpIcon />,
    categories: ["Methods"],
  },
  {
    key: "build-measure-learn",
    title: "Build-Measure-Learn",
    href: "https://theleanstartup.com/",
    icon: <RepeatIcon />,
    categories: ["Methods"],
  },
  {
    key: "design-thinking",
    title: "Design Thinking",
    href: "https://www.ideou.com/blogs/inspiration/what-is-design-thinking",
    icon: <CompassIcon />,
    categories: ["Methods"],
  },
]

function ToolLogo({
  src,
  darkInvert = false,
}: {
  src: string
  darkInvert?: boolean
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={16}
      height={16}
      className={`size-3.5 shrink-0 ${darkInvert ? "dark:invert" : ""}`}
      unoptimized
    />
  )
}
