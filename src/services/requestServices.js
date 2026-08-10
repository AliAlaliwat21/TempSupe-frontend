const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allRequests = async ()=>{
    try {
        const res = await fetch (`${BASE_URL}/service-requests`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json',
            },
        })

        const allRequestsData = await res.json()

        if (allRequestsData.error){
            throw new Error(error)
        }
    } catch (error) {
        throw new Error (error)
    }
    
}


const createRequests = async(formData)=>{
    try {
        const res = await fetch(`${BASE_URL}/service-requests`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (error) {
        throw new Error (error)
    }
}

export {allRequests, createRequests}