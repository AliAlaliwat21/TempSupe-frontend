import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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



}

