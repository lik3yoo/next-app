import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const defaultLocale = "zh"

  const _cookies = cookies().getAll()
  const lang = _cookies.find((i) => i.name === "lang")?.value || defaultLocale

  return {
    locale: lang,
    messages: (await import(`../messages/${lang}.json`)).default,
  }
})
