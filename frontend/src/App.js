import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// css 
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import UserLogin from './components/User/UserLogin'
import Navbar from './components/shared/Navbar'
import UserRegister from './components/User/UserRegister'

const App = () => {
  return (
    <div>
        <Navbar />
        <BrowserRouter>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={UserLogin} />
          <Route path="/register" exact component={UserRegister} />
          <Route path="/booking/new" exact component={CreateBooking} />
        </BrowserRouter>
    </div>
  )
}

export default App
