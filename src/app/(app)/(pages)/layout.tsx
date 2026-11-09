import { SectionMinimap } from "@/components/section-minimap"

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto border-x border-x-line pt-4 md:max-w-3xl">
      {children}
      <SectionMinimap />
    </div>
  )
}
