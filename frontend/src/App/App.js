import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// components 
import Dashboard from '../components/Dashboard/Dashboard'
import CreateBooking from '../components/Booking/CreateBooking'
import UserLogin from '../components/User/UserLogin'
import Navbar from '../components/shared/Navbar'
import UserRegister from '../components/User/UserRegister'

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/register" exact component={UserRegister} />
        <Route path="/booking/new" exact component={CreateBooking} />
      </BrowserRouter>
    </>
  )
}

export default App
