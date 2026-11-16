import { useShowMore } from '../hooks/useShowMore.js'
import FavoriteButton from './FavoriteButton.jsx'

export default function RelatedProducts({ products }) {
  const step = 4
  const {
    visibleItems: visibleProducts,
    hiddenCount,
    showMore,
    collapse,
  } = useShowMore(products, step)
  const hasMore = hiddenCount > 0

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Схожі товари</h2>
      <ul className="related-list" aria-labelledby="related-title">
        {visibleProducts.map((item) => (
          <li key={item.id} className="related-card">
            <h3>{item.name}</h3>
            <p>{item.notes}</p>
            <p className="price">{item.price} грн</p>
            <FavoriteButton productId={item.id} name={item.name} />
          </li>
        ))}
        {products.length > step && (
          <li className="related-more">
            <button
              type="button"
              className="show-more"
              onClick={hasMore ? showMore : collapse}
            >
              {hasMore
                ? `Показати ще ${Math.min(step, hiddenCount)}`
                : 'Згорнути'}
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}
