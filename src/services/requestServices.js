const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const allRequests = async ()=>{
    try {
        const res = await fetch (`${BASE_URL}/service-requests`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })

        const fetchedData = await res.json()

        if (!res.ok){
            throw new Error(fetchedData.message)
        }

        return fetchedData
    } catch (error) {
        throw new Error (error)
    }
    
}


const createRequest = async(formData)=>{
    try {
        const res = await fetch(`${BASE_URL}/service-requests`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const fetchedData = await res.json()

        if (!res.ok){
            throw new Error(fetchedData.message)
        }
        return fetchedData

    } catch (error) {
        throw new Error (error)
    }
}

const singleRequest = async (requestId)=>{
    try {
         const res = await fetch(`${BASE_URL}/service-requests/${requestId}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        const fetchedData = await res.json()

     if (!res.ok){
            throw new Error(fetchedData.message)
        }

        return fetchedData

    } catch (error) {
        throw new Error(error)
    }
}

const deleteRequest = async(requestId)=>{
    try{
    const res = await fetch(`${BASE_URL}/
        service-requests/${requestId}`,{
            method: 'DELETE',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        const fetchedData = await res.json()

        if (!res.ok){
            throw new Error(fetchedData.message)
        }

        return fetchedData
}   catch (error){
    throw new Error(error)
    }
} 
export {allRequests, createRequest, singleRequest}