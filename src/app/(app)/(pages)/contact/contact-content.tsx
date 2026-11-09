"use client"

import { useState } from "react"
import { MailIcon, MapPinIcon, SendIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"

export function ContactContent() {
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "loading"
  >("idle")
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (status !== "idle") {
      setStatus("idle")
      setMessage("")
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedEmail = formData.email.trim()
    const trimmedMessage = formData.message.trim()
    const trimmedSubject = formData.subject.trim()

    if (
      !formData.name.trim() ||
      !trimmedEmail ||
      !trimmedSubject ||
      !trimmedMessage
    ) {
      setStatus("error")
      setMessage("أكمل الحقول المطلوبة لنتمكن من إرسال رسالتك.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error")
      setMessage("تحقق من عنوان البريد الإلكتروني.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      })

      const data = (await response.json().catch(() => ({
        error: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
      }))) as {
        error?: string
      }

      if (!response.ok) {
        const fallbackBody = `subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(
          `${formData.name}\n${trimmedEmail}\n\n${trimmedMessage}`
        )}`

        window.location.href = `mailto:gamal.htg@gmail.com?${fallbackBody}`
        setStatus("error")
        setMessage(
          data.error ||
            "لم يتم الإرسال من النموذج. يمكنك إكمال رسالتك عبر البريد."
        )
        return
      }

      setStatus("success")
      setMessage("وصلت رسالتك، شكرًا لك. سأرد عليك قريبًا.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      const fallbackBody = `subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(
        `${formData.name}\n${trimmedEmail}\n\n${trimmedMessage}`
      )}`
      window.location.href = `mailto:gamal.htg@gmail.com?${fallbackBody}`
      setStatus("error")
      setMessage("لم يتم الإرسال من النموذج. يمكنك إكمال رسالتك عبر البريد.")
    }
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 pb-8 font-eight font-features-['ss01','zero']"
    >
      <PageHeading>
        <PageHeadingTagline>التواصل</PageHeadingTagline>
        <PageHeadingTitle className="text-right">
          ما التحدي الذي تريد حله؟
        </PageHeadingTitle>
        <PageHeadingDescription className="text-right">
          أخبرني عن منتجك والنتيجة التي تسعى إليها، ولنحدد معًا الخطوة الأنسب.
        </PageHeadingDescription>
      </PageHeading>

      <Panel id="contact-methods">
        <PanelHeader>
          <PanelTitle className="text-right tracking-normal" dir="rtl">
            طرق التواصل
          </PanelTitle>
        </PanelHeader>

        <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col justify-between gap-3 p-4 sm:p-5">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MailIcon className="size-3.5 text-primary" />
                البريد الإلكتروني
              </span>
              <a
                href="mailto:gamal.htg@gmail.com"
                dir="ltr"
                className="block w-full text-right text-base font-medium text-foreground transition-all hover:underline"
              >
                gamal.htg@gmail.com
              </a>
            </div>

            <Button
              type="button"
              size="sm"
              className="w-fit gap-2"
              onClick={() =>
                window.location.assign("mailto:gamal.htg@gmail.com")
              }
            >
              <SendIcon className="size-3.5 -scale-x-100" />
              إرسال بريد إلكتروني
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-3 p-4 sm:p-5">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPinIcon className="size-3.5 text-primary" />
                الموقع
              </span>
              <p className="text-base font-medium text-foreground">
                القاهرة، مصر
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">
                متاح للتعاون
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 p-4 sm:p-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                نوع التعاون
              </span>
              <p className="text-base font-medium text-foreground">
                منتج، تجربة، أو استراتيجية
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              أساعد في تعريف المشكلة، ترتيب الأولويات، وتهيئة الحل.
            </p>
          </div>
        </div>
      </Panel>

      <Panel id="contact-form">
        <PanelHeader>
          <PanelTitle className="text-right tracking-normal" dir="rtl">
            أرسل تفاصيل مشروعك
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="sm:p-5">
          <div className="mb-4 rounded border border-line bg-muted/30 p-3 text-xs/relaxed text-muted-foreground">
            <strong>تفضّل البريد؟ </strong>
            راسلني مباشرة على{" "}
            <a
              href="mailto:gamal.htg@gmail.com"
              dir="ltr"
              className="text-foreground underline"
            >
              gamal.htg@gmail.com
            </a>
            .
          </div>

          <form
            action="/api/contact"
            method="post"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-foreground"
                >
                  الاسم
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  dir="rtl"
                  className="text-right"
                  placeholder="مثال: أحمد محمد"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-foreground"
                >
                  البريد الإلكتروني
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  dir="ltr"
                  placeholder="مثال: name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-medium text-foreground"
              >
                موضوع الرسالة
              </label>
              <Input
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={(event) =>
                  handleChange("subject", event.target.value)
                }
                dir="rtl"
                className="text-right"
                placeholder="مثال: تحسين تجربة التسجيل"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-foreground"
              >
                نص الرسالة
              </label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(event) =>
                  handleChange("message", event.target.value)
                }
                dir="rtl"
                className="text-right"
                placeholder="ما الذي تريد تحسينه؟ ومن سيستخدم المنتج؟"
                required
              />
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

            <Button
              type="submit"
              size="sm"
              className="gap-2"
              disabled={status === "loading"}
            >
              <SendIcon className="size-3.5 -scale-x-100" />
              {status === "loading" ? "جاري الإرسال..." : "إرسال الرسالة"}
            </Button>
          </form>
        </PanelContent>
      </Panel>
    </div>
  )
}
