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

    {hero.backgroundGif && (
      <img
        className="hero-background-gif"
        src={hero.backgroundGif}
        alt=""
      />
    )}

    <div className="hero-background-overlay"></div>

    <div className="hero-details-container">

      <section className="hero-title-section">
        <p className="vought-label">VOUGHT INTERNATIONAL</p>

        <h1>{hero.name}</h1>

        <p className="hero-specialty">
          {hero.specialty}
        </p>
      </section>


      <section className="hero-bio-section">

        <div className="hero-bio-text">
          <h2>Biography</h2>

          <p>{hero.detailedBio}</p>
        </div>

        {hero.detailGif && (
          <div className="hero-gif-container">
            <img
              src={hero.detailGif}
              alt={hero.name}
              className="hero-detail-gif"
            />
          </div>
        )}

      </section>


      <section className="hero-stats-grid">

        <article className="hero-detail-card">
          <h2>Powers</h2>

          <ul>
            {hero.powers.map((power) => (
              <li key={power}>
                {power}
              </li>
            ))}
          </ul>
        </article>


        <article className="hero-detail-card">
          <h2>Strength</h2>
          <p>{hero.strength}</p>
        </article>


        <article className="hero-detail-card">
          <h2>Specialty</h2>
          <p>{hero.specialty}</p>
        </article>


        <article className="hero-detail-card">
          <h2>Latest Save</h2>
          <p>{hero.latestSave}</p>
        </article>


        <article className="hero-detail-card">
          <h2>Biggest Save</h2>
          <p>{hero.biggestSave}</p>
        </article>


        <article className="hero-detail-card">
          <h2>Greatest Feat</h2>
          <p>{hero.greatestFeat}</p>
        </article>

      </section>


      {/* REVIEW SECTION */}

      <section className="hero-reviews-section">

        <h2>Reviews</h2>


        {/* THIS IS YOUR ACTUAL REVIEW FORM */}

        <div className="review-form-container">

          <h3>Leave a Review</h3>

          <ReviewForm
            handleAddReview={handleAddReview}
          />

        </div>


        {/* REVIEWS ALREADY SUBMITTED */}

        <div className="reviews-grid">

          {hero.reviews.length > 0 ? (

            hero.reviews.map((review) => (

              <article
                key={review._id}
                className="review-card"
              >

                <h3>
                  {review.rating}/5 ★
                </h3>

                <p>
                  {review.content}
                </p>

                <button
                  onClick={() =>
                    handleDeleteReview(review._id)
                  }
                >
                  Delete Review
                </button>

              </article>

            ))

          ) : (

            <p>
              No reviews yet.
            </p>

          )}

        </div>

      </section>

    </div>

  </main>
)


}
export default HeroDetails
