import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as heroService from '../services/heroServices'
import ReviewForm from '../components/ReviewForm'


const HeroDetails = (props)=>{
    const navigate = useNavigate()
    const { heroId } = useParams()

    const [hero, setHero] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        const fetchHero = async()=>{
            try {
                const heroData = await heroService.singleHero(heroId)

                setHero(heroData)

            } catch (error) {
                console.log(error)

            } finally{
                setIsLoading(false)
            }
            
        }
        fetchHero()
    }, [heroId])


    const handleAddReview = async (formData)=>{
    try {
       const newReview = await heroService.createReview(heroId, formData)
        setHero({...hero, reviews:[...hero.reviews, newReview]})
    } catch (error) {
        console.log(error)
    }
}

const handleDeleteReview = async (reviewId)=>{
        try {
            const deletedreview = await heroService.deleteReview(heroId, reviewId)
            const filteredReviews = hero.reviews.filter((review)=>{
                return review._id !== reviewId
            })
            setHero({...hero, reviews: filteredReviews})
        } catch (error) {
        console.log(error)
        }
    }

        if (isLoading) return <p>Loading hero...</p>

        if (!hero) return <p>Hero not found.</p>

return (
  <main className={`hero-details-page ${hero.theme}`}>

    {hero.backgroundVideo && (
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={hero.backgroundVideo} type="video/mp4" />
      </video>
    )}

    <div className="hero-background-overlay"></div>

    <section className="hero-details-content">

      <header className="hero-header">
        <div>
          <h1>{hero.name}</h1>
          <p className="hero-specialty">
            {hero.specialty}
          </p>
        </div>
      </header>

      <section className="hero-about">

        <div className="hero-description">
          <h2>Biography</h2>
          <p>{hero.detailedBio}</p>
        </div>

        {hero.detailMedia && (
          <div className="hero-detail-media">
            <img
              src={hero.detailMedia}
              alt={`${hero.name} showcase`}
            />
          </div>
        )}

      </section>


      <section className="hero-info-grid">

        <article className="hero-info-card">
          <h2>Powers</h2>

          <ul>
            {hero.powers.map((power) => (
              <li key={power}>
                {power}
              </li>
            ))}
          </ul>
        </article>


        <article className="hero-info-card">
          <h2>Strength</h2>
          <p>{hero.strength}</p>
        </article>


        <article className="hero-info-card">
          <h2>Latest Save</h2>
          <p>{hero.latestSave}</p>
        </article>


        <article className="hero-info-card">
          <h2>Biggest Save</h2>
          <p>{hero.biggestSave}</p>
        </article>


        <article className="hero-info-card">
          <h2>Greatest Feat</h2>
          <p>{hero.greatestFeat}</p>
        </article>

      </section>


      <section className="reviews-section">

        <h2>Public Reviews</h2>

        <ReviewForm
          handleAddReview={handleAddReview}
        />

        <div className="reviews-list">
          {hero.reviews.map((review) => (
            <article
              className="review-card"
              key={review._id}
            >
              <div className="review-rating">
                ★ {review.rating}/5
              </div>

              <p>{review.content}</p>

              {props.user &&
                review.author === props.user._id && (
                  <button
                    onClick={() =>
                      handleDeleteReview(review._id)
                    }
                  >
                    Delete
                  </button>
                )}
            </article>
          ))}
        </div>

      </section>

    </section>

  </main>
)



}
export default HeroDetails
