import { OpenPanel } from "@openpanel/web"

const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID

export const op = new OpenPanel({
  clientId: clientId || "",
  disabled: !clientId,
  trackScreenViews: Boolean(clientId),
})
