import { endpoints, texts } from './config'
import { withLoading } from '../stores/loadingStore'

// Keep loading active until both the response and its JSON body are ready.
export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  return withLoading(async () => {
    const response = await fetch(new URL(path, endpoints.baseUrl), { signal })
    if (!response.ok) throw new Error(texts.common.networkError)
    return await response.json() as T
  })
}
