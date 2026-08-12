import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import * as requestServices from '../services/requestServices'

const Dashboard = (props) => {

    const { requestId } = useParams()
    const [allUserRequests, setAllUsersRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const fetchUserRequest = async () => {
            try{
            const requestsData =  await requestServices.allRequests()
            setAllUsersRequests(requestsData)
            
        }catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }
        fetchUserRequest()
    
    }, [])

    if (isLoading) return <p>Loading...</p>

    return (
        <section>

            <header>
                <h1>Welcome {props.user.username}!</h1>

                <h2>Your Service Requests</h2>
            </header>


            {allUserRequests.length === 0 ? (

                <p>You have not submitted any requests yet.</p>

            ) : (

                allUserRequests.map((request) => (

                    <div
                        className="card"
                        key={request._id}
                    >

                        <header>

                            <h2>
                                {request.hero?.name || 'Unknown Hero'}
                            </h2>

                        </header>


                        <p>
                            <strong>Request Type:</strong>{' '}
                            {request.requestType}
                        </p>


                        <p>
                            <strong>Description:</strong>{' '}
                            {request.description}
                        </p>


                        <p>
                            <strong>Location:</strong>{' '}
                            {request.location}
                        </p>


                        <p>
                            <strong>Requested Date:</strong>{' '}
                            {request.requestedDate
                                ? request.requestedDate.slice(0, 10)
                                : 'No date'}
                        </p>


                        <p>
                            <strong>Status:</strong>{' '}
                            {request.status}
                        </p>

                    </div>

                ))

            )}

        </section>
    )
}

export default Dashboard