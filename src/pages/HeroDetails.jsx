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
    const handleDeleteReview = async (formData)=>{
        try {
            const deletedreview = heroService.deleteReview(heroId, reviewId)
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

    return(
        <>
            <main>
                <h1>{hero.name}</h1>
            </main>
        </>
    )



}
export default HeroDetails

