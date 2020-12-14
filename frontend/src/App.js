import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// css 
import 'materialize-css'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import UserLogin from './components/User/UserLogin'
import Navbar from './components/shared/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/booking/new" exact component={CreateBooking} />
      </BrowserRouter>
    </div>
  )
}

export default App
