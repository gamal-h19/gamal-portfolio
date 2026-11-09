import { NextResponse, type NextRequest } from "next/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      case "'":
        return "&#39;"
      default:
        return character
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const subject = typeof body.subject === "string" ? body.subject.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !emailRegex.test(email) || !message || !subject) {
      return NextResponse.json(
        {
          error:
            "يرجى التحقق من الاسم والبريد الإلكتروني والموضوع ونص الرسالة.",
        },
        { status: 400 }
      )
    }

    const apiKey = process.env.BREVO_API_KEY
    const toEmail = process.env.BREVO_CONTACT_EMAIL
    const senderEmail = process.env.BREVO_SENDER_EMAIL

    if (!apiKey || !toEmail || !senderEmail) {
      return NextResponse.json(
        {
          error:
            "يتعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا أو التواصل عبر البريد الإلكتروني.",
        },
        { status: 503 }
      )
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          email: senderEmail,
          name: "Gamal Hassan Portfolio",
        },
        to: [{ email: toEmail, name: "Gamal Hassan" }],
        subject: subject || "Portfolio contact form",
        htmlContent: `
          <h3>New portfolio message</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Brevo contact form failed:", errorText)
      return NextResponse.json(
        { error: "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى لاحقًا." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact route error:", error)
    return NextResponse.json(
      { error: "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى لاحقًا." },
      { status: 500 }
    )
  }
}
