"use client"

import { ExternalLinkIcon, SmartphoneIcon, WalletIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import {
  CONSULTATION_PRICE_USD,
  trackConsultationPaymentClick,
} from "@/features/consultation/lib/analytics"
import type { ConsultationPaymentMethod } from "@/features/consultation/lib/payment"
import {
  CONSULTATION_INSTAPAY_ADDRESS,
  CONSULTATION_INSTAPAY_URL,
  CONSULTATION_WALLET_NUMBER,
} from "@/features/consultation/lib/payment"

function PaymentValue({
  value,
  method,
  copyLabel,
}: {
  value: string
  method: ConsultationPaymentMethod
  copyLabel: string
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-1.5">
      <span
        dir="ltr"
        className="min-w-0 truncate font-mono text-sm text-foreground select-all"
      >
        {value}
      </span>
      <CopyButton
        aria-label={copyLabel}
        className="shrink-0 rounded-md border-none text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5"
        variant="ghost"
        size="icon-xs"
        text={value}
        onCopySuccess={() =>
          trackConsultationPaymentClick({ method, action: "copy" })
        }
      />
    </div>
  )
}

export function ConsultationPaymentMethods({
  className,
}: {
  className?: string
}) {
  return (
    <section
      dir="rtl"
      aria-labelledby="consultation-payment-title"
      className={cn("flex flex-col gap-3 border-t border-line pt-4", className)}
    >
      <div className="flex flex-col gap-1">
        <h3
          id="consultation-payment-title"
          className="text-base font-medium text-foreground"
        >
          طرق الدفع
        </h3>
        <p className="text-sm wrap-break-word text-muted-foreground">
          حوّل قيمة الجلسة (ما يعادل {CONSULTATION_PRICE_USD}$ بالجنيه المصري)
          عبر InstaPay أو المحفظة الإلكترونية، ثم احجز موعدك.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-line p-3">
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <SmartphoneIcon className="size-3.5 text-primary" aria-hidden />
            InstaPay
          </span>
          <PaymentValue
            value={CONSULTATION_INSTAPAY_ADDRESS}
            method="instapay"
            copyLabel="انسخ عنوان InstaPay"
          />
          <Button
            size="sm"
            variant="secondary"
            className="w-full gap-2"
            nativeButton={false}
            render={
              <a
                href={CONSULTATION_INSTAPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConsultationPaymentClick({
                    method: "instapay",
                    action: "open_link",
                  })
                }
              />
            }
          >
            ادفع عبر InstaPay
            <ExternalLinkIcon className="size-3.5" aria-hidden />
            <span className="sr-only">(يفتح في تبويب جديد)</span>
          </Button>
        </div>

        <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-line p-3">
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <WalletIcon className="size-3.5 text-primary" aria-hidden />
            المحفظة الإلكترونية
          </span>
          <PaymentValue
            value={CONSULTATION_WALLET_NUMBER}
            method="wallet"
            copyLabel="انسخ رقم المحفظة"
          />
          <p className="text-xs wrap-break-word text-muted-foreground">
            حوّل المبلغ إلى هذا الرقم من تطبيق محفظتك.
          </p>
        </div>
      </div>
    </section>
  )
}
