"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

const NEWSLETTER_ITEMS = [
  "طرق عملية لفهم احتياجات المستخدمين",
  "أدوات لاتخاذ قرارات أفضل بشأن المنتج",
  "دروس من تجارب التصميم والنمو",
]

export function NewsletterContent() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "loading"
  >("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedEmail = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail) {
      setStatus("error")
      setMessage("يرجى إدخال بريد إلكتروني صحيح.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      })

      const data = (await response.json().catch(() => ({
        error: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
      }))) as {
        error?: string
        ok?: boolean
      }

      if (!response.ok) {
        setStatus("error")
        setMessage(
          data.error || "لم نتمكن من تسجيل بريدك. حاول مرة أخرى بعد قليل."
        )
        return
      }

      setStatus("success")
      setMessage("تم تسجيلك. ستصلك الرسالة القادمة على بريدك.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("لم نتمكن من تسجيل بريدك. حاول مرة أخرى بعد قليل.")
    }
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col pb-8 font-eight font-features-['ss01','zero']"
    >
      <PageHeading>
        <PageHeadingTagline>النشرة</PageHeadingTagline>
        <PageHeadingTitle>أفكار عملية لتطوير المنتجات.</PageHeadingTitle>
        <PageHeadingDescription>
          أفكار قصيرة عن أبحاث المستخدمين وقرارات المنتج، دون رسائل زائدة.
        </PageHeadingDescription>
      </PageHeading>

      <section className="mt-4">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {[
            {
              title: "خطوات قابلة للتطبيق",
              text: "أدوات وأسئلة تساعدك على اتخاذ قرارك التالي.",
            },
            {
              title: "خبرة من المشاريع",
              text: "دروس مستخلصة من تحديات تصميم وتطوير المنتجات.",
            },
            {
              title: "رسائل قليلة",
              text: "محتوى مختصر يصل إلى صلب الموضوع.",
            },
          ].map((item) => (
            <article key={item.title} className="bg-background p-4 sm:p-5">
              <h2 className="text-lg font-medium text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-sm/6 text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="newsletter-signup"
        aria-labelledby="newsletter-signup-title"
        className="mt-4"
      >
        <div className="grid gap-px bg-line lg:grid-cols-2">
          <div className="min-w-0 space-y-4 bg-background p-4 sm:p-5">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                انضم إلى القائمة البريدية
              </p>
              <h2
                id="newsletter-signup-title"
                className="text-2xl font-medium tracking-normal text-balance"
              >
                أرسل لي بريدك للتحديثات القادمة
              </h2>
            </div>

            <p className="text-base text-muted-foreground">
              اترك بريدك لتصلك أفكار قابلة للتطبيق على عملك.
            </p>

            <form
              action="/api/newsletter"
              method="post"
              noValidate
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="block text-xs font-medium text-foreground"
                >
                  البريد الإلكتروني
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (status !== "idle") {
                        setStatus("idle")
                        setMessage("")
                      }
                    }}
                    dir="ltr"
                    className="text-left"
                    placeholder="name@example.com"
                    aria-label="البريد الإلكتروني"
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2 sm:w-auto"
                    disabled={status === "loading"}
                  >
                    <span>
                      {status === "loading" ? "جاري الإرسال..." : "اشترك"}
                    </span>
                    <ArrowRightIcon className="size-3.5 -scale-x-100" />
                  </Button>
                </div>
              </div>

              {message ? (
                <p
                  className={cn(
                    "text-sm",
                    status === "error" ? "text-destructive" : "text-foreground"
                  )}
                  role={status === "error" ? "alert" : "status"}
                  aria-live={status === "error" ? "assertive" : "polite"}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>

          <div className="min-w-0 bg-background p-4 sm:p-5">
            <p className="text-xs font-medium text-muted-foreground">
              ماذا ستستفيد؟
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {NEWSLETTER_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-flex size-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
