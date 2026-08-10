const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allHeroes = async()=>{
    try {
        const res = await fetch(`${BASE_URL}/heroes`,{
        method: 'Get',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
    const heroesData = await res.json()
    
    
    if (heroesData.err) return console.log(heroesData.err) 
        throw new Error(heroesData.err)
   
    return heroesData
    } catch (err) {
        throw new Error(err)
        
    }

}

const singleHero = async (heroId)=>{
try {
    const res = await fetch(`${BASE_URL}/heroes/:${heroId}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })

    const heroData = await res.json()

    if (heroData.err) return console.log(heroData.err) 
        throw new Error(err)

    return heroData
} catch (error) {
    throw new Error(error)
}

}

export {allHeroes, singleHero}