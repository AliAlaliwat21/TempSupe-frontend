import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as heroService from '../services/heroServices'
import ReviewForm from '../components/ReviewForm'


const HeroDetails = (props)=>{
    const navigate = useNavigate()
    const { heroId } = useParams()

    const [hero, setHero] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [editingReviewId, setEditingReviewId] = useState(null)
    const [editReviewData, setEditReviewData] = useState({
        content: '',
        rating: ''
            })
    

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

    const handleEditReview = (review) => {
    setEditingReviewId(review._id)

    setEditReviewData({
        content: review.content,
        rating: review.rating
    })
    }

    const handleEditReviewChange = (event) => {
    setEditReviewData({...editReviewData, [event.target.name]: event.target.value})
    }

    const handleUpdateReview = async (reviewId) => {
  try {
    const updatedReview = await heroService.updateReview(
      heroId,
      reviewId,
      editReviewData
    )

    const updatedReviews = hero.reviews.map((review) => {
      return review._id === reviewId ? updatedReview : review
    })

    setHero({...hero, reviews: updatedReviews})

    setEditingReviewId(null)

  } catch (error) {
    console.log(error)
  }
}

        if (isLoading) return <p>Loading hero...</p>

        if (!hero) return <p>Hero not found.</p>

return (
  <main className={`hero-details-page ${hero.theme}`}>

    {hero.backgroundVideo && (
      <img
        className="hero-background-gif"
        src={hero.backgroundVideo}
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

        {hero.detailMedia && (
          <div className="hero-gif-container">
            <img
              src={hero.detailMedia}
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


      <section className="hero-reviews-section">

        <h2>Reviews</h2>

        <div className="review-form-container">

          <h3>Leave a Review</h3>

          <ReviewForm
            handleAddReview={handleAddReview}
          />

        </div>


        <div className="reviews-grid">

         {hero.reviews.map((review) => (

        <article
            key={review._id}
            className="review-card"
        >

            {editingReviewId === review._id ? (

            <>
                <textarea
                name="content"
                value={editReviewData.content}
                onChange={handleEditReviewChange}
                />

                <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={editReviewData.rating}
                onChange={handleEditReviewChange}
                />

                <button
                onClick={() => handleUpdateReview(review._id)}
                >
                Save
                </button>

                <button
                onClick={() => setEditingReviewId(null)}
                >
                Cancel
                </button>
            </>

            ) : (

            <>
                <h3>
                {review.rating}/5 ★
                </h3>

                <p>{review.content}</p>

                <button
                onClick={() => handleEditReview(review)}
                >
                Edit Review
                </button>

                <button
                onClick={() => handleDeleteReview(review._id)}
                >
                Delete Review
                </button>
            </>

            )}

  </article>

))}

        </div>

      </section>

    </div>

  </main>
)


}
export default HeroDetails
