const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allHeroes = async()=>{
    try {
        const res = await fetch(`${BASE_URL}/heroes`)
        const heroesData = await res.json()
    
    
    if (heroesData.error) {
        return console.log(heroesData.error) 
        throw new Error(heroesData.error)
    }
   
    return heroesData
    } catch (error) {
        throw new Error(error)
        
    }

}

const singleHero = async (heroId)=>{
try {
    const res = await fetch(`${BASE_URL}/heroes/${heroId}`)

    const heroData = await res.json()

    if (heroData.error) {
        return console.log(heroData.error) 
        throw new Error(error)
    } 

    return heroData
} catch (error) {
    throw new Error(error)
}

}

const createReview = async(heroId, reviewData)=>{
    try {
        const res = await fetch(`${BASE_URL}/heroes/${heroId}/reviews`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(reviewData)
        })
        const fetchedData = await res.json()

        if(!res.ok){
            throw new Error(fetchedData)
        }
        return fetchedData
    } catch (error) {
        throw new Error (error)
    }
}

const updateReview = async (heroId, reviewId, reviewData) =>{
    try {
        const res = await fetch(`${BASE_URL}/heroes/${heroId}/reviews/${reviewId}`, 
        {
            method: 'PUT',

            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type' : 'application/json'},

            body: JSON.stringify(reviewData)
        }
        
    )

    const fetchedData = await res.json()

     if(!res.ok){
            throw new Error(fetchedData)
        }

        return fetchedData

    } catch (error) {
        throw new Error (error)
    }
    
}

const deleteReview = async(heroId, reviewId)=>{
    try {
        const res = await fetch(`${BASE_URL}/heroes/${heroId}/reviews/${reviewId}`,
           {
            method: 'DELETE',
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type' : 'application/json'},
           } 
        )
        const fetchedData = await res.json()

        if(!res.ok){
            throw new Error (fetchedData)
        }

        return fetchedData
    } catch (error) {
        throw new Error (error)
    }
}

export {allHeroes, singleHero, createReview, updateReview, deleteReview}