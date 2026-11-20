import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CheckoutStep = "cart" | "details" | "payment" | "confirmation"

const STEPS: { value: CheckoutStep; label: string }[] = [
  { value: "cart", label: "السلة" },
  { value: "details", label: "البيانات" },
  { value: "payment", label: "الدفع" },
  { value: "confirmation", label: "التأكيد" },
]

export function CheckoutSteps({
  current,
  needsPayment,
}: {
  current: CheckoutStep
  /** Free orders skip the payment step. */
  needsPayment: boolean
}) {
  const steps = needsPayment
    ? STEPS
    : STEPS.filter(({ value }) => value !== "payment")
  const currentIndex = steps.findIndex(({ value }) => value === current)

  return (
    <nav aria-label="خطوات الطلب" className="border-b border-line px-4 py-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {steps.map((step, index) => {
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <li key={step.value} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-muted-foreground/40" aria-hidden>
                  ←
                </span>
              )}
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-1.5",
                  isCurrent
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border font-mono text-[0.65rem]",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                    isDone && "border-primary/40 text-primary"
                  )}
                >
                  {isDone ? (
                    <CheckIcon className="size-3" aria-hidden />
                  ) : (
                    index + 1
                  )}
                </span>
                {step.label}
                {isDone && <span className="sr-only"> (تمت)</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
