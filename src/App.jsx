import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import HeroList from "./pages/HeroList"
import * as heroServices from "./services/heroServices"
import * as requestService from "./services/requestServices"
import HeroDetails from "./pages/HeroDetails"
import RequestSupport from "./pages/requestSupport"
import RequestList from "./components/RequestList"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  const [heroes, setHeroes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchAllHeroes = async ()=>{
        try {
          const heroesData = await heroServices.allHeroes()
          setHeroes(heroesData)
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }

    }
    fetchAllHeroes()
  }, [])
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />

        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />

        <Route path='/heroes' element={<HeroList heroes={heroes} isLoading={isLoading} />} />

        <Route path='heroes/:heroId' element={<HeroDetails/>} />

        <Route path='request-support' element={<RequestSupport/>} />

        <Route path="/service-requests" element={<RequestList/>}  />
      </Routes>
      </main>
    </div>
  )
}

export default App