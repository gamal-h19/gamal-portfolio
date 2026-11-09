import { Caveat } from "next/font/google"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import { GeistSerif } from "geist/font/serif"

import { cn } from "@/lib/utils"

const fontSans = GeistSans

const fontSerif = GeistSerif

export const fontEight = localFont({
  src: [
    {
      path: "../assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/eight/Thmanyah-Font-Family/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  preload: false,
  variable: "--font-eight",
})

const fontHandwritten = Caveat({
  weight: "400",
  display: "swap",
  variable: "--font-handwritten",
})

const fontMono = localFont({
  src: "../assets/fonts/PaperMono[wght].woff2",
  weight: "100 800",
  display: "swap",
  preload: false,
  variable: "--font-mono",
})

// Only the iPod uses it, so it loads on demand instead of on every page.
const fontChicagoKare = localFont({
  src: "../assets/fonts/ChicagoKare-Regular.woff2",
  weight: "400",
  display: "block",
  preload: false,
  variable: "--font-chicago-kare",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontSerif.variable,
  fontHandwritten.variable,
  fontChicagoKare.variable,
  fontEight.variable
)
