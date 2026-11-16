import { useState } from 'react'

export default function ShowMore({ items, step, children }) {
  const [count, setCount] = useState(step)

  const visibleItems = items.slice(0, count)
  const hiddenCount = items.length - visibleItems.length
  const hasMore = hiddenCount > 0

  function handleClick() {
    if (hasMore) {
      setCount((prev) => prev + step)
    } else {
      setCount(step)
    }
  }

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button type="button" className="show-more" onClick={handleClick}>
          {hasMore ? `Показати ще ${Math.min(step, hiddenCount)}` : 'Згорнути'}
        </button>
      )}
    </>
  )
}
