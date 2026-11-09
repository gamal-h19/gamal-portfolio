export interface LocalizedUserProfile {
  displayName: string
  jobTitle: string
  bio: string
  taglines: string[]
  address: string
  jobs: {
    title: string
    company: string
    website: string
    experienceId: string
  }[]
  aboutPoints: string[]
}

export const USER_AR: LocalizedUserProfile = {
  displayName: "جمال حسن",
  jobTitle: "مصمم تجربة مستخدم وباحث ومدير منتجات",
  bio: "أحوّل فهم المستخدمين إلى قرارات وتصاميم تجعل المنتجات أوضح وأسهل.",
  taglines: [
    "أبحاث المستخدمين",
    "استراتيجية المنتجات",
    "تصميم تجارب رقمية",
    "قرارات مبنية على البيانات",
  ],
  address: "القاهرة، مصر",
  jobs: [
    {
      title: "مدير منتجات مستقل",
      company: "دعوى",
      website: "",
      experienceId: "daawa",
    },
    {
      title: "مدير منتجات",
      company: "إيليت فيت",
      website: "",
      experienceId: "elitevet",
    },
    {
      title: "باحث تجربة مستخدم",
      company: "ينمو",
      website: "https://ynmo.org",
      experienceId: "ynmo",
    },
  ],
  aboutPoints: [
    "أحوّل ما يكشفه البحث إلى قرارات وتصاميم تجعل المنتج أوضح وأسهل في الاستخدام.",
    "عملت على منتجات قانونية وبيطرية وتعليمية، وأوازن بين احتياج الناس وهدف العمل وما يمكن تنفيذه.",
  ],
}
