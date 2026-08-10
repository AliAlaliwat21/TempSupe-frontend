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

export {allHeroes, singleHero}