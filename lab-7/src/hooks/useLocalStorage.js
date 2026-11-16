import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return typeof initialValue === 'function'
          ? initialValue()
          : initialValue
      }
      return JSON.parse(item)
    } catch {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage errors, such as when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue]
}
