import { endpoints, texts } from './config'

// Keep transport concerns separate from feature services.
export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(new URL(path, endpoints.baseUrl), { signal })
  if (!response.ok) throw new Error(texts.common.networkError)
  return response.json() as Promise<T>
}
