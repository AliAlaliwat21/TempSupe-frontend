const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allRequests = async ()=>{
    try {
        const res = await fetch (`${BASE_URL}/service-requests`)

        const allRequestsData = await res.json()

        if (allRequestsData.error){
            throw new Error(error)
        }
    } catch (error) {
        throw new Error (error)
    }
    
}

export {allRequests}