import { useNavigate } from 'react-router'

import * as requestServices from '../services/requestServices'

import RequestForm from '../components/RequestForm'


const RequestSupport = () => {

    const navigate = useNavigate()


    const handleAddRequest = async (formData) => {

        try {

            const newRequest =
                await requestServices.createRequest(formData)

            console.log(newRequest)

            navigate('/service-requests')

        } catch (error) {

            console.log(error)

        }

    }


    return (

        <main className='service-request-page'>

            <section className='service-request-card'>


                <header>

                    <p className='request-eyebrow'>
                        VOUGHT INTERNATIONAL
                    </p>

                    <h1>
                        Request Hero Support
                    </h1>

                    <p>
                        Submit a non-emergency request for assistance
                        from a member of The Seven.
                    </p>

                </header>


                <RequestForm
                    handleAddRequest={handleAddRequest}
                />


            </section>

        </main>

    )

}


export default RequestSupport