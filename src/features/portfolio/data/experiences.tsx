import {
  BriefcaseBusinessIcon,
  DraftingCompassIcon,
  SearchIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "daawa",
    companyName: "Daawa",
    companyWebsite:
      "https://www.figma.com/design/yUBBEmWGJwHrPtZMWkchwV/Daawasa-Portal?node-id=0-1&p=f&t=BkbYrpvc7OoWeIyA-0",
    location: "Saudi Arabia",
    locationType: "Remote",
    positions: [
      {
        id: "daawa-lead",
        title: "PM & UX Strategy (Freelance)",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Freelance",
        icon: <BriefcaseBusinessIcon />,
        description: `- Product strategy and UX redesign for legal management platform.
- Designed structured client onboarding and transparent progress tracking.
- Spearheaded Phase 1 of the Legal AI Agent workflow for automated document comprehension.
- Drove activation and retention funnel optimization across user lifecycles.`,
        skills: [
          "Product Strategy",
          "UX Redesign",
          "Legal AI Agent",
          "Onboarding Funnel",
          "Retention Optimization",
          "Figma",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "ynmo",
    companyName: "Ynmo",
    companyWebsite: "https://daycare.ynmodata.com/auth/register",
    location: "Riyadh, Saudi Arabia",
    locationType: "Remote",
    positions: [
      {
        id: "ynmo-ux",
        title: "UX Researcher & UX Designer",
        employmentPeriod: {
          start: "11.2022",
        },
        employmentType: "Full-time",
        icon: <SearchIcon />,
        description: `- Multi-role SaaS platform design serving nursery managers, educators, supervisors, and parents.
- Designed comprehensive web management portal and two native mobile applications (Ynmo Daycare & Ynmo Tifli).
- Led UX research initiatives, customer journey mapping, and usability optimizations with native Arabic RTL localization.`,
        skills: [
          "UX Research",
          "SaaS Design",
          "Arabic RTL Experience",
          "Design Systems",
          "Customer Journey Mapping",
          "Information Architecture",
          "Mobile UX",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "elitevet",
    companyName: "EliteVet",
    location: "Remote",
    locationType: "Remote",
    positions: [
      {
        id: "elitevet-lead",
        title: "Product Manager & UX Lead",
        employmentPeriod: {
          start: "2023",
          end: "2024",
        },
        employmentType: "Contract",
        icon: <BriefcaseBusinessIcon />,
        description: `- Coordinated the development team, managed sprint planning, task priorities, and the product backlog.
- Led product discovery around veterinary clinic and hospital workflows, defining MVP scope using RICE prioritization.
- Created user flows, scenarios, business rules, edge cases, user stories, and acceptance criteria.
- Worked on core SaaS modules: inventory management, batches and expiry tracking, stock movements and dispensing restrictions, stock adjustments and disposal, appointments and reception queue, tasks and suppliers, POS, and branch assignment with role-based access control.`,
        skills: [
          "Product Management",
          "UX Leadership",
          "Sprint Planning",
          "Product Backlog",
          "RICE Prioritization",
          "User Stories & Acceptance Criteria",
          "Clinical Workflow Design",
          "Inventory Management",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "mabeaty",
    companyName: "Mabeaty",
    location: "Remote",
    locationType: "Remote",
    positions: [
      {
        id: "mabeaty-ux",
        title: "UX Designer",
        employmentPeriod: {
          start: "11.2021",
          end: "02.2022",
        },
        employmentType: "Contract",
        icon: <DraftingCompassIcon />,
        description: `- Product interface improvements and usability enhancements across primary consumer touchpoints.
- Supported UX research audits, heuristic evaluations, and content restructuring.
- Refined navigation taxonomy and wireframing for core journeys.`,
        skills: [
          "UX Design",
          "Usability Evaluation",
          "Heuristic Analysis",
          "Information Architecture",
          "Wireframing",
        ],
      },
    ],
  },
]
