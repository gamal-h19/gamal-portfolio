"use client"

import type { Route } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LocalizedNotFoundActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        nativeButton={false}
        render={
          <Link href={"/" as Route}>
            العودة للرئيسية
            <ArrowRightIcon className="-scale-x-100" />
          </Link>
        }
      />
    </div>
  )
}
