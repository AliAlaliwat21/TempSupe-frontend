import { useState } from 'react'
import { Link } from 'react-router'
import Loading from '../components/Loading'


const HeroList = ({ heroes, isLoading }) => {

    if (isLoading) {
    return <Loading />
    }



  const displayedHeroes = heroes.filter((hero) => {


    if (!hero.generation) {
      return false
    }


    if (showLegacy) {

      return hero.generation.includes('legacy')

    }


    return hero.generation.includes('current')

  })



  const handleGenerationSwitch = () => {

    setShowLegacy(!showLegacy)

  }



  return (

    <main
      className={`hero-list-page ${
        showLegacy
          ? 'legacy-team'
          : 'current-team'
      }`}
    >


      <header className="hero-list-header">


        <p className="vought-label">

          {showLegacy
            ? 'VOUGHT ARCHIVES'
            : 'VOUGHT INTERNATIONAL'
          }

        </p>



        <h1>

          {showLegacy
            ? 'Payback'
            : 'The Seven'
          }

        </h1>



        <p className="hero-list-intro">

          {showLegacy
            ? `Explore Vought's previous generation of premier superheroes. Select a Payback member to view their archived profile, abilities and achievements.`
            : `Meet Vought's premier team of superheroes. Select a member to view their profile, abilities, achievements and services.`
          }

        </p>


      </header>



      <section
        className="hero-list-grid"
        aria-label={
          showLegacy
            ? 'Members of Payback'
            : 'Members of The Seven'
        }
      >


        {displayedHeroes.map((hero) => (


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

                  {showLegacy
                    ? 'PAYBACK'
                    : 'THE SEVEN'
                  }

                </p>



                <h2>
                  {hero.name}
                </h2>



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



        <article
          className={`hero-list-card generation-switch-card ${
            showLegacy
              ? 'switch-to-current'
              : 'switch-to-legacy'
          }`}
        >


          <button
            type="button"
            className="generation-switch-button"
            onClick={handleGenerationSwitch}
          >


            <div className="hero-card-content">


              <p className="hero-card-label">
                VOUGHT ARCHIVES
              </p>



              <h2>

                {showLegacy
                  ? 'THE SEVEN'
                  : 'PAYBACK'
                }

              </h2>



              <p className="hero-card-specialty">

                {showLegacy
                  ? 'Return to the modern generation.'
                  : 'Discover the heroes who came before.'
                }

              </p>



              <p className="hero-card-biography">

                {showLegacy
                  ? `Return to Vought's current premier superhero team.`
                  : `Access Vought's archives and view the previous generation of premier superheroes.`
                }

              </p>



              <span className="hero-card-action">

                {showLegacy
                  ? 'View The Seven →'
                  : 'View Older Generation →'
                }

              </span>


            </div>


          </button>


        </article>


      </section>


    </main>

  )

}


export default HeroList