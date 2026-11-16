import { useState } from 'react'

export function useShowMore(items, step) {
  const [count, setCount] = useState(step)

  const visibleItems = items.slice(0, count)
  const hiddenCount = items.length - visibleItems.length

  function showMore() {
    setCount((prev) => Math.min(prev + step, items.length))
  }

  function collapse() {
    setCount(step)
  }

  return { visibleItems, hiddenCount, showMore, collapse }
}
