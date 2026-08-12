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
   
//     if (isLoading) {
//     return <p>Loading...</p>
//   }

  
  return (
  <main className="request-list-page">

    <h1>My Service Requests</h1>

    <section className="request-list-grid">

      {requests.length === 0 ? (
        <p>You have no requests!</p>
      ) : (
        requests.map((request) => (
          <article
            key={request._id}
            className="request-card"
          >

            <h2>{request.requestType}</h2>

            <p>
              Hero: {request.hero?.name}
            </p>

            <p>
              Status: {request.status}
            </p>

            <p>
              Submitted by: {request.requester?.username}
            </p>

            <Link to={`/service-requests/${request._id}`}>
              View Request
            </Link>

          </article>
        ))
      )}

    </section>

  </main>
)

    
}
export default RequestList