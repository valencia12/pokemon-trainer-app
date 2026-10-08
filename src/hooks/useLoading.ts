import { useSyncExternalStore } from 'react'
import { getLoadingSnapshot, subscribeToLoading, withLoading } from '../stores/loadingStore'

export function useLoading() {
  const isLoading = useSyncExternalStore(subscribeToLoading, getLoadingSnapshot, () => false)
  return { isLoading, withLoading }
}
