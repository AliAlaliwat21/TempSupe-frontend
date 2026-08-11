import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import * as heroService from '../services/heroServices'


const ReviewForm = (props)=>{
    const { heroId, reviewId } = useParams()
    const navigate = useNavigate()

    const initialState = {
        content:'',
        rating:''
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if (heroId && reviewId){
           await heroService.updateReview(heroId, reviewId, formData)
            navigate(`/heroes/${heroId}`)
        } else{
            props.handleAddReview(formData)
        }
        setFormData(initialState)
    }

    useEffect(()=>{
        const fetchHero = async()=>{
            const heroData = await heroService.singleHero(heroId)
            console.log(heroData)
            const foundReview = heroData.reviews.find((review)=>{
                return review._id === reviewId
            })
            setFormData(foundReview)
        }
        if (heroId && reviewId) fetchHero()
    }, [heroId, reviewId])

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor='content-input'>
            Your review:
        </label>

        <textarea
        required
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
/>
        <label>Your Rating:</label>
        <input type='number'name='rating' id='rating-input' min="1" max="5" value={formData.rating} onChange={handleChange} >
        
        </input>
        <button type='submit'>
            Submit Review
        </button>
        </form>
    )
}

export default ReviewForm  