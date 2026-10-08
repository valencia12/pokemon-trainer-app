let pendingOperations = 0
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export function subscribeToLoading(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function getLoadingSnapshot() {
  return pendingOperations > 0
}

// Each operation releases only its own loading state, even if cleanup runs twice.
export function startLoading() {
  pendingOperations += 1
  notify()
  let finished = false
  return () => {
    if (finished) return
    finished = true
    pendingOperations -= 1
    notify()
  }
}

export async function withLoading<T>(operation: () => Promise<T>): Promise<T> {
  const finish = startLoading()
  try {
    return await operation()
  } finally {
    finish()
  }
}
