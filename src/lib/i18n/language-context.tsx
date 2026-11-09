import { TRANSLATIONS } from "./translations"
import type { LanguageContextType } from "./types"

const arabicLanguage: LanguageContextType = {
  locale: "ar",
  dir: "rtl",
  t: (key) => TRANSLATIONS.ar[key] ?? key,
}

export function useLanguage(): LanguageContextType {
  return arabicLanguage
}
