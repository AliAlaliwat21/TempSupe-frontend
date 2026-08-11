import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import * as heroService from '../services/heroServices'
import * as requestServices from '../services/requestServices'

const reviewForm = (props)=>{
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

    const handleSubmit = (event)=>{
        event.preventDefault()
        if (heroId && reviewId){
            heroService.updateReview(heroId, reviewId, formData)
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
        <button type='submit'>
            Submit Review
        </button>
        </form>
    )
}

export default reviewForm  