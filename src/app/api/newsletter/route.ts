import { NextResponse, type NextRequest } from "next/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string }
    const email = typeof body.email === "string" ? body.email.trim() : ""

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "يرجى إدخال عنوان بريد إلكتروني صحيح." },
        { status: 400 }
      )
    }

    const apiKey = process.env.BREVO_API_KEY
    const listId = process.env.BREVO_LIST_ID

    if (!apiKey || !listId) {
      return NextResponse.json(
        {
          error: "يتعذر الاشتراك في النشرة حاليًا. يرجى المحاولة لاحقًا.",
        },
        { status: 503 }
      )
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
        attributes: {
          SOURCE: "portfolio",
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Brevo newsletter signup failed:", errorText)

      return NextResponse.json(
        { error: "تعذر الاشتراك الآن. يرجى المحاولة مرة أخرى لاحقًا." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Newsletter route error:", error)
    return NextResponse.json(
      { error: "تعذر الاشتراك الآن. يرجى المحاولة مرة أخرى لاحقًا." },
      { status: 500 }
    )
  }
}
