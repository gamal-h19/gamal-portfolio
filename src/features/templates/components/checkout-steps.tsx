import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CheckoutStep = "cart" | "details" | "payment" | "confirmation"

const STEPS: { value: CheckoutStep; label: string; hint: string }[] = [
  { value: "cart", label: "السلة", hint: "اختر قوالبك" },
  { value: "details", label: "البيانات", hint: "اسمك وبريدك" },
  { value: "payment", label: "الدفع", hint: "تحويل المبلغ" },
  { value: "confirmation", label: "التأكيد", hint: "استلم قوالبك" },
]

export function CheckoutSteps({
  current,
  needsPayment,
  onStepClick,
}: {
  current: CheckoutStep
  /** Free orders skip the payment step. */
  needsPayment: boolean
  /** Lets the reader go back to a finished step; omitted, steps are not clickable. */
  onStepClick?: (step: CheckoutStep) => void
}) {
  const steps = needsPayment
    ? STEPS
    : STEPS.filter(({ value }) => value !== "payment")
  const currentIndex = steps.findIndex(({ value }) => value === current)
  const isFinished = current === "confirmation"

  return (
    <nav
      aria-label="خطوات الطلب"
      className="flex flex-col gap-3 border-b border-line p-4"
    >
      <p className="text-xs text-muted-foreground">
        الخطوة {currentIndex + 1} من {steps.length}
        {!needsPayment && current !== "confirmation" && (
          <span className="text-emerald-700 dark:text-emerald-400">
            {" "}
            · طلبك مجاني، بلا خطوة دفع
          </span>
        )}
      </p>
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const isDone = index < currentIndex || isFinished
          const isCurrent = index === currentIndex && !isFinished
          const canGoBack = isDone && !isFinished && onStepClick

          const marker = (
            <>
              <span
                className={cn(
                  "relative z-1 flex size-7 items-center justify-center rounded-full border bg-background font-mono text-xs transition-colors",
                  isCurrent &&
                    "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15",
                  isDone && "border-primary bg-primary/10 text-primary",
                  !isDone && !isCurrent && "border-line text-muted-foreground"
                )}
              >
                {isDone ? (
                  <CheckIcon className="size-3.5" aria-hidden />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "text-xs",
                  isCurrent || isDone
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              <span className="hidden text-[0.7rem] text-muted-foreground sm:block">
                {step.hint}
              </span>
              {isDone && <span className="sr-only"> (تمت)</span>}
            </>
          )

          return (
            <li
              key={step.value}
              aria-current={isCurrent ? "step" : undefined}
              className="relative flex flex-1 flex-col items-center"
            >
              {index > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-e-1/2 top-3.5 h-0.5 w-full -translate-y-1/2",
                    index <= currentIndex || isFinished
                      ? "bg-primary/60"
                      : "bg-line"
                  )}
                />
              )}
              {canGoBack ? (
                <button
                  type="button"
                  onClick={() => onStepClick(step.value)}
                  className="flex flex-col items-center gap-1 rounded-md text-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {marker}
                  <span className="sr-only">، ارجع لهذه الخطوة</span>
                </button>
              ) : (
                <span className="flex flex-col items-center gap-1 text-center">
                  {marker}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
