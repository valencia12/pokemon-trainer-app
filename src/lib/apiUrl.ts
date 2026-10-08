import { texts } from './config'

export function parseApiBaseUrl(value: string | undefined): string {
  try {
    if (!value?.trim()) throw new Error()
    const url = new URL(value.trim())
    if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash || url.username || url.password) throw new Error()
    url.pathname = `${url.pathname.replace(/\/+$/, '')}/`
    return url.toString()
  } catch {
    throw new Error(texts.common.environmentError)
  }
}
