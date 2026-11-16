import { useShowMore } from '../hooks/useShowMore.js'

export default function ShowMore({ items, step, children }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step,
  )
  const hasMore = hiddenCount > 0

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button
          type="button"
          className="show-more"
          onClick={hasMore ? showMore : collapse}
        >
          {hasMore ? `Показати ще ${Math.min(step, hiddenCount)}` : 'Згорнути'}
        </button>
      )}
    </>
  )
}
