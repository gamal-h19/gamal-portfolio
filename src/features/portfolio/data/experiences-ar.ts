import React from "react"
import {
  BriefcaseBusinessIcon,
  DraftingCompassIcon,
  SearchIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES_AR: Experience[] = [
  {
    id: "daawa",
    companyName: "دعوى",
    companyLogo: "/images/company-logos/daawa.png",
    companyWebsite:
      "https://www.figma.com/design/yUBBEmWGJwHrPtZMWkchwV/Daawasa-Portal?node-id=0-1&p=f&t=BkbYrpvc7OoWeIyA-0",
    location: "المملكة العربية السعودية",
    locationType: "Remote",
    positions: [
      {
        id: "daawa-lead",
        title: "مدير منتجات مستقل",
        employmentPeriod: {
          start: "01.2026",
          end: "02.2026",
        },
        employmentType: "مستقل",
        icon: React.createElement(BriefcaseBusinessIcon),
        description: `- تصميم بوابتي المحامين والعملاء وتبسيط التسجيل ومتابعة القضايا.
- تحديد متطلبات مساعد ذكي لتحليل الوثائق القانونية.`,
        skills: [
          "استراتيجية المنتج",
          "تصميم تجربة المستخدم",
          "الذكاء الاصطناعي القانوني",
          "تهيئة المستخدم",
          "فيجما",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "elitevet",
    companyName: "إيليت فيت",
    companyLogo: "/images/company-logos/elitevet.jpg",
    location: "عن بُعد",
    locationType: "Remote",
    positions: [
      {
        id: "elitevet-lead",
        title: "مدير منتجات وتجربة المستخدم",
        employmentPeriod: {
          start: "03.2025",
          end: "08.2025",
        },
        employmentType: "عقد عمل",
        icon: React.createElement(BriefcaseBusinessIcon),
        description: `- ترتيب أولويات المنتج وفق احتياجات العيادات البيطرية.
- تصميم مسارات العمل وكتابة متطلبات واضحة للفريق التقني.`,
        skills: [
          "إدارة المنتجات",
          "استراتيجية تجربة المستخدم",
          "تخطيط دورات العمل",
          "ترتيب الأولويات وفق الوصول والأثر والثقة والجهد",
          "معايير قبول الميزات",
          "تصميم تدفقات العمل الطبية",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "ynmo",
    companyName: "ينمو",
    companyLogo: "/images/company-logos/ynmo.svg",
    companyWebsite: "https://daycare.ynmodata.com/auth/register",
    location: "الرياض، المملكة العربية السعودية",
    locationType: "Remote",
    positions: [
      {
        id: "ynmo-ux",
        title: "باحث تجربة مستخدم",
        employmentPeriod: {
          start: "11.2022",
          end: "02.2026",
        },
        employmentType: "دوام كامل",
        icon: React.createElement(SearchIcon),
        description: `- بحث وتصميم منصة وتطبيقات تربط إدارة الحضانة بالمعلمات والأسر.
- تحسين تجربة عربية واضحة تدعم اتجاه الكتابة من اليمين إلى اليسار.`,
        skills: [
          "أبحاث المستخدمين",
          "تصميم المنصات السحابية",
          "تجربة عربية من اليمين إلى اليسار",
          "تصميم الأنظمة",
          "تصميم تطبيقات الجوال",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "mabeaty",
    companyName: "مبيعاتي",
    companyLogo: "/images/company-logos/mabeaty.jpg",
    location: "عن بُعد",
    locationType: "Remote",
    positions: [
      {
        id: "mabeaty-ux",
        title: "مصمم تجربة مستخدم",
        employmentPeriod: {
          start: "11.2021",
          end: "02.2022",
        },
        employmentType: "عقد عمل",
        icon: React.createElement(DraftingCompassIcon),
        description: `- مراجعة سهولة الاستخدام وإعادة تنظيم المحتوى.
- تصميم نماذج أولية لتسهيل التصفح وإنجاز المهام الأساسية.`,
        skills: [
          "تصميم تجربة المستخدم",
          "تقييم واختبار سهولة الاستخدام",
          "التحليل الاستكشافي",
          "تنظيم المعلومات",
          "تصميم النماذج التخطيطية",
        ],
      },
    ],
  },
]
