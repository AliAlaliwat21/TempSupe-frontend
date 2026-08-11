import { Link } from 'react-router'

const HeroList = ({ heroes, isLoading }) => {

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="hero-list-page">

      <header className="hero-list-header">
        <p className="vought-label">
          VOUGHT INTERNATIONAL
        </p>

        <h1>The Seven</h1>

        <p className="hero-list-intro">
          Meet Vought's premier team of superheroes.
          Select a member to view their profile,
          abilities, achievements and services.
        </p>
      </header>

      <section
        className="hero-list-grid"
        aria-label="Members of The Seven"
      >

        {heroes.map((hero) => (

          <article
            key={hero._id}
            className={`hero-list-card ${hero.theme}`}
          >

            <Link
              to={`/heroes/${hero._id}`}
              className="hero-card-link"
            >

              {hero.image && (
                <figure className="hero-card-media">
                  <img
                    src={hero.image}
                    alt={hero.name}
                  />
                </figure>
              )}

              <div className="hero-card-content">

                <p className="hero-card-label">
                  THE SEVEN
                </p>

                <h2>{hero.name}</h2>

                <p className="hero-card-specialty">
                  {hero.specialty}
                </p>

                <p className="hero-card-biography">
                  {hero.biography}
                </p>

                <span className="hero-card-action">
                  View Profile →
                </span>

              </div>

            </Link>

          </article>

        ))}

      </section>

    </main>
  )
}

export default HeroList