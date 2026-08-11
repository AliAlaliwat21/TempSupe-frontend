import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import * as requestServices from '../services/requestServices'
import * as heroService from '../services/heroServices'


const RequestForm = (props) => {

    const { requestId } = useParams()
    const navigate = useNavigate()


    const initialState = {
        hero: '',
        requestType: '',
        description: '',
        location: '',
        requestedDate: '',
        status: 'Submitted'
    }


    const [formData, setFormData] = useState(initialState)

    const [heroes, setHeroes] = useState([])


    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }


    const handleSubmit = async (event) => {

        event.preventDefault()


        if (requestId) {

            await requestServices.updateRequest(
                requestId,
                formData
            )

            navigate('/service-requests')

        } else {

            await props.handleAddRequest(formData)

        }


        setFormData(initialState)

    }


    useEffect(() => {

        const fetchHeroes = async () => {

            const heroData = await heroService.allHeroes()

            setHeroes(heroData)

        }


        const fetchRequest = async () => {

            const requestData =
                await requestServices.singleRequest(requestId)


            setFormData({
                hero: requestData.hero?._id || requestData.hero,
                requestType: requestData.requestType,
                description: requestData.description,
                location: requestData.location,
                requestedDate: requestData.requestedDate
                    ? requestData.requestedDate.slice(0, 10)
                    : '',
                status: requestData.status
            })

        }


        fetchHeroes()


        if (requestId) {

            fetchRequest()

        }


    }, [requestId])


    return (

        <form onSubmit={handleSubmit}>


            <label htmlFor='hero-input'>
                Select Hero:
            </label>

            <select
                required
                name='hero'
                id='hero-input'
                value={formData.hero}
                onChange={handleChange}
            >

                <option value=''>
                    Select a Hero
                </option>


                {heroes.map((hero) => (

                    <option
                        key={hero._id}
                        value={hero._id}
                    >

                        {hero.name}

                    </option>

                ))}

            </select>



            <label htmlFor='request-type-input'>
                Request Type:
            </label>

                <select
                required
                name='requestType'
                id='request-type-input'
                value={formData.requestType}
                onChange={handleChange}
                >
                <option value=''>
                    Select a Request Type
                </option>

                <option value='Emergency Response'>
                    Emergency Response
                </option>

                <option value='VIP Escort'>
                    VIP Escort
                </option>

                <option value='Event Appearance'>
                    Event Appearance
                </option>

                <option value='Investigation'>
                    Investigation
                </option>

                <option value='Search and Rescue'>
                    Search and Rescue
                </option>

                <option value='Disaster Assistance'>
                    Disaster Assistance
                </option>

                <option value='Security Support'>
                    Security Support
                </option>

                <option value='Other'>
                    Other
                </option>
                </select>



            <label htmlFor='description-input'>
                Describe Your Situation:
            </label>

            <textarea
                required
                name='description'
                id='description-input'
                value={formData.description}
                onChange={handleChange}
            />



            <label htmlFor='location-input'>
                Location:
            </label>

            <input
                required
                type='text'
                name='location'
                id='location-input'
                value={formData.location}
                onChange={handleChange}
            />



            <label htmlFor='requested-date-input'>
                Requested Date:
            </label>

            <input
                required
                type='date'
                name='requestedDate'
                id='requested-date-input'
                value={formData.requestedDate}
                onChange={handleChange}
            />



            <button type='submit'>

                {requestId
                    ? 'Update Request'
                    : 'Submit Request'
                }

            </button>


        </form>

    )

}


export default RequestForm