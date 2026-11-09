import { ARABIC_CASE_STUDIES } from "./case-studies-ar"

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  role: string
  image: string
  brandLogo: string
  brandColor: string
  period: {
    start: string
    end?: string
  }
  productType: string
  platforms: string[]
  targetAudience: string[]
  externalLinks?: {
    label: string
    url: string
  }[]
  overview: string
  challenge: string
  businessImpact?: string
  problemUnderstanding?: string
  researchInsights?: string[]
  problemDefinition?: string
  prioritization?: string
  uxProcess: string[]
  redesignStrategy?: string[]
  process?: {
    title: string
    phase: string
    color: string
    width: string
  }[]
  designSolution: string
  uxImprovements?: {
    title: string
    problem: string
    decision: string
    experience: string
    value: string
  }[]
  keyFlowsAndFeatures: {
    title: string
    description: string
  }[]
  visuals?: {
    src: string | string[]
    alt: string
    title: string
    description: string
    type: string
    width: number
    height: number
  }[]
  collaborationAndDelivery: string
  outcomesAndLearnings: string[]
  skills: string[]
}

export const CASE_STUDIES: CaseStudy[] = ARABIC_CASE_STUDIES
