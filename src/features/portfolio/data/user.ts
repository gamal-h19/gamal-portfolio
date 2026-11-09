import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Gamal",
  lastName: "Hassan",
  displayName: "Gamal Hassan",
  username: "gamalhassan",
  gender: "male",
  pronouns: "he/him",
  bio: "I help teams turn user needs into clear, useful digital products that are easy to adopt and simple to grow.",
  taglines: [
    "UX Design & Research.",
    "Product Strategy.",
    "AI Product Thinking.",
    "B2B SaaS & Growth.",
  ],
  address: "Cairo, Egypt",
  phoneNumberB64: "KzIwMTAwNzgxNzk3OA==", // E.164 format (+201007817978), base64 encoded
  emailB64: "Z2FtYWwuaHRnQGdtYWlsLmNvbQ==", // base64 encoded (gamal.htg@gmail.com)
  website: "",
  jobTitle: "UX Designer • Researcher • Product Manager",
  jobs: [
    {
      title: "PM & UX Strategy (Freelance)",
      company: "Daawa",
      website: "",
      experienceId: "daawa",
    },
    {
      title: "Product Manager & UX Lead",
      company: "EliteVet",
      website: "",
      experienceId: "elitevet",
    },
    {
      title: "UX Researcher & UX Designer",
      company: "Ynmo",
      website: "https://ynmo.org",
      experienceId: "ynmo",
    },
  ],
  about: `- I’m Gamal Hassan — a UX designer, researcher, and product manager helping teams build digital products that are clear, useful, and easy to trust.
- I work at the intersection of user research, product strategy, and interface design, turning messy problems into practical, scalable experiences.
- My work spans legal workflows, clinic operations, childcare systems, and product experiences designed for real users and real business goals.
`,
  avatar: "",
  avatarOutline: "",
  avatarMonochrome: "",
  avatarVariants: {
    lightOff: "",
    lightOn: "",
    darkOff: "",
    darkOn: "",
  },
  ogImage: "",
  namePronunciationUrl: "",
  timeZone: "Africa/Cairo",
  keywords: [
    "Gamal Hassan",
    "gamalhassan",
    "UX Designer",
    "UX Researcher",
    "Product Manager",
    "AI-Driven SaaS",
    "UX Strategy",
    "Product Growth",
    "Design Systems",
    "User Experience",
    "Egypt",
    "مصمم تجربة المستخدم",
    "باحث تجربة المستخدم",
    "مدير المنتجات",
    "أبحاث المستخدمين",
    "استراتيجية المنتجات الرقمية",
    "تصميم المنتجات الرقمية",
    "منصات SaaS",
  ],
  dateCreated: "2026-11-03", // YYYY-MM-DD
}
