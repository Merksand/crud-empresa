import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts = []

const listeners = []

function emitChange() {
  listeners.forEach((listener) => {
    listener(toasts)
  })
}

function addToRemoveQueue(toastId) {
  if (
    toasts.find((toast) => toast.id === toastId)?.duration !== Infinity
  ) {
    setTimeout(() => {
      toastId && dismiss(toastId)
    }, TOAST_REMOVE_DELAY)
  }
}

export function toast({
  title,
  description,
  type,
  duration = 5000,
  ...props
}) {
  const id = genId()

  const newToast = {
    id,
    title,
    description,
    type,
    duration,
    ...props,
  }

  toasts.push(newToast)
  emitChange()

  if (duration !== Infinity) {
    setTimeout(() => {
      dismiss(id)
    }, duration)
  }

  return id
}

export function dismiss(toastId) {
  const index = toasts.findIndex((toast) => toast.id === toastId)
  if (index !== -1) {
    toasts.splice(index, 1)
    emitChange()
  }
}

export function useToast() {
  const [state, setState] = useState(toasts)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    toast,
    dismiss,
    toasts: state,
  }
} 