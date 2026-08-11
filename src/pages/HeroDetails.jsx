import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as heroService from '../services/heroServices'
import reviewForm from '../components/reviewForm'


const heroDetails = (props)=>{
    const navigate = useNavigate()
    const { heroId } = useParams()

    const [hero, setHero] = useState(null)

    useEffect(()=>{
        const fetchHero = async()=>{
            const heroData = await heroService.singleHero(heroId)
            setHero(heroData)
        }
        fetchHero()
    }, [])
}