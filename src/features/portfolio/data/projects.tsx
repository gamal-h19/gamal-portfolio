import {
  ActivityIcon,
  BotIcon,
  Building2Icon,
  HeartPulseIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "ynmo-daycare",
    title: "Ynmo Daycare",
    period: {
      start: "11.2022",
    },
    link: "/case-studies/ynmo-daycare",
    skills: [
      "UX Research",
      "SaaS Design",
      "Arabic RTL Localization",
      "Multi-Role Workflows",
      "Web & Mobile",
    ],
    description: `Daycare and nursery management SaaS platform designed for multi-role operational workflows.
- Web management portal and mobile applications for nursery managers, teachers, and parents.
- Native Arabic RTL experience and localized educational workflows.
- Role: UX Researcher & UX Designer.
`,
    icon: <Building2Icon />,
    isExpanded: true,
  },
  {
    id: "ynmo-tifli",
    title: "Ynmo Tifli",
    period: {
      start: "11.2022",
    },
    link: "/case-studies/ynmo-tifli",
    skills: [
      "Mobile UX",
      "User Research",
      "Arabic RTL Experience",
      "Child Development",
    ],
    description: `Child-focused mobile experience within the Ynmo ecosystem connecting developmental milestones with parental care.
- Approachable, empathetic timeline tracking child development and daily activities.
- Available on the iOS App Store.
- Role: UX Researcher & UX Designer.
`,
    icon: <ActivityIcon />,
  },
  {
    id: "elitevet",
    title: "EliteVet",
    period: {
      start: "01.2023",
      end: "12.2024",
    },
    link: "/case-studies/elitevet",
    skills: [
      "Product Manager & UX Lead",
      "RICE Prioritization",
      "Clinical Workflows",
      "Pharmaceutical Inventory",
      "Sprint Planning",
    ],
    description: `AI-enabled SaaS platform for veterinary clinics and animal hospitals in the Middle East.
- Complex workflows: batches, expiry tracking, dispensing restrictions, reception queue, and multi-branch management.
- Coordinated dev team, sprint planning, and authored comprehensive user stories and acceptance criteria.
- Role: Product Manager & UX Lead.
`,
    icon: <HeartPulseIcon />,
  },
  {
    id: "daawa",
    title: "Daawa",
    period: {
      start: "01.2026",
    },
    link: "/case-studies/daawa",
    skills: [
      "Product Strategy",
      "LegalTech SaaS",
      "Legal AI Agent",
      "Funnel Optimization",
      "UX Redesign",
    ],
    description: `Legal management system modernizing case workflows and client onboarding.
- UX redesign, client progress tracking, and retention funnel optimization.
- Defined Phase 1 of Legal AI Agent for document synthesis and task automation.
- Role: PM & UX Strategy (Freelance), 2026–Present.
`,
    icon: <BotIcon />,
  },
]
