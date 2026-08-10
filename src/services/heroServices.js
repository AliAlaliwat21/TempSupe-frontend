const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allHeroes = async()=>{
    try {
            const res = await fetch(`${BASE_URL}/users`,{
        method: 'Get',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
    const heroData = await res.json()
    
    
    if (heroData.err) return console.log(heroData.err) 
        throw new Error(heroData.err)
   
    return heroData
    } catch (err) {
        throw new Error(err)
        
    }

}

export {allHeroes}