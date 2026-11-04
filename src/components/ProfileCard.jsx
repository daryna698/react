import { useState } from 'react'

function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="profile-card">
      <p className="profile-card__eyebrow">Знайомство</p>
      <h1>Про мене</h1>
      <dl className="profile-card__details">
        <div>
          <dt>Ім’я</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <dt>Група</dt>
          <dd>{group}</dd>
        </div>
      </dl>
      <section className="profile-card__technologies">
        <h2>Хочу опанувати</h2>
        <ul>
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>
      <button
        className="profile-card__like"
        type="button"
        onClick={() => setLikes((count) => count + 1)}
      >
        Подобається <span aria-live="polite">{likes}</span>
      </button>
    </article>
  )
}

export default ProfileCard
