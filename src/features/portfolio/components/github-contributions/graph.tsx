"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import type { Activity } from "@/registry/components/contribution-graph"
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/registry/components/github-contributions"

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>
}) {
  const { locale } = useLanguage()
  return (
    <GitHubContributions
      contributions={contributions}
      githubProfileUrl="https://github.com/gamal-h19"
      locale={locale}
    />
  )
}

export function GitHubContributionFallback() {
  return <GitHubContributionsFallback />
}
