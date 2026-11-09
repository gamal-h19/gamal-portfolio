"use client"

import React from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { useAvatarLights } from "@/hooks/use-avatar-lights"

export function AvatarLightsToggle(
  props: Omit<React.ComponentProps<"button">, "onClick">
) {
  const { toggleLights } = useAvatarLights()

  useHotkeys("l", toggleLights)

  return (
    <button
      aria-label="تبديل إضاءة الصورة"
      title="تبديل إضاءة الصورة"
      onClick={toggleLights}
      {...props}
    />
  )
}
