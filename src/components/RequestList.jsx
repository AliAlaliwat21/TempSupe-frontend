import { useEffect, useState } from 'react'
import * as requestServices from '../services/requestServices'
import { Link } from 'react-router'

const RequestList = ()=>{

    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchAllRequests = async ()=>{
            try {
            const requestsData = await requestServices.allRequests()
            setRequests(requestsData)
            } catch (error) {
            console.log(error)
            } finally{
                setIsLoading(false)
            }
        }
        fetchAllRequests()
        
        
    }, [])
   
    if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
        <h1>My Service Requests</h1>

        {requests.length === 0 ? <p>You have no requests!</p> : requests.map((request)=>(
            <article key={request._id}>
            <h2>{request.requestType}</h2>

            <p>
              Hero: {request.hero?.name}
            </p>

            <p>
              Status: {request.status}
            </p>

            <Link to={`/service-requests/${request._id}`}>
              View Request
            </Link>
          </article>
        )) }
    </>
  )
    
}
export default RequestList