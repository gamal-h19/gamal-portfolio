import { NextResponse, type NextRequest } from "next/server"

import { SITE_URL } from "@/lib/site-url"
import {
  buildOrder,
  parseOrderRequest,
  renderCustomerEmail,
  renderOwnerEmail,
  type OrderResponse,
} from "@/features/templates/lib/order"

const SENDER_NAME = "Gamal Hassan Templates"

type BrevoEmail = {
  to: { email: string; name?: string }
  replyTo?: { email: string; name?: string }
  subject: string
  html: string
}

async function sendEmail(
  config: { apiKey: string; senderEmail: string },
  email: BrevoEmail
) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
      },
      body: JSON.stringify({
        sender: { email: config.senderEmail, name: SENDER_NAME },
        to: [email.to],
        ...(email.replyTo ? { replyTo: email.replyTo } : {}),
        subject: email.subject,
        htmlContent: email.html,
      }),
    })

    if (!response.ok) {
      console.error("Brevo template order email failed:", await response.text())
    }

    return response.ok
  } catch (error) {
    console.error("Brevo template order email error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const parsed = parseOrderRequest(body)

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const origin = SITE_URL || request.nextUrl.origin
  const order = buildOrder(parsed.value, origin)

  const apiKey = process.env.BREVO_API_KEY
  const ownerEmail = process.env.BREVO_CONTACT_EMAIL
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const config = apiKey && senderEmail ? { apiKey, senderEmail } : null

  const ownerNotified =
    config && ownerEmail
      ? await sendEmail(config, {
          to: { email: ownerEmail, name: "Gamal Hassan" },
          replyTo: { email: order.email, name: order.name },
          ...renderOwnerEmail(order, origin),
        })
      : false

  // Paid templates and templates without a file are sent by hand, so an order
  // the owner never hears of would be lost.
  if (order.pending.length > 0 && !ownerNotified) {
    return NextResponse.json(
      {
        error:
          "تعذر إرسال الطلب الآن. حاول مرة أخرى بعد قليل، أو راسلني على gamal.htg@gmail.com.",
      },
      { status: 503 }
    )
  }

  const emailSent = config
    ? await sendEmail(config, {
        to: { email: order.email, name: order.name },
        ...(ownerEmail ? { replyTo: { email: ownerEmail } } : {}),
        ...renderCustomerEmail(order),
      })
    : false

  const response: OrderResponse = {
    orderId: order.id,
    total: order.total,
    deliveries: order.deliveries,
    pending: order.pending,
    emailSent,
  }

  return NextResponse.json(response)
}
