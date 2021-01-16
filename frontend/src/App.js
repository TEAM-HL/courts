import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StateContext } from './config/store'
import { stateReducer } from './config/stateReducer'
//materialize
import 'materialize-css/dist/css/materialize.min.css'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import UserLogin from './components/User/UserLogin'
import NavbarHeader from './components/shared/NavbarHeader'
import UserRegister from './components/User/UserRegister'
import Preview from './components/Checkout/Preview'
//toastify 
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// css
import './assets/css/App.css'

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// const stripePromise = loadStripe('pk_test_thG1zqeSc5ZWjKDe6OENpRPe00rgTugo8l');


const App = () => {

  // configure toast on App render
  useEffect(() => {
    toast.configure()
  })
  
  
  // set initial state for global
  const initialState = {
    loggedInUser: null,
    authenticated: false,
    pendingBooking: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)

   return (
    <>
      <StateContext.Provider value={{store, dispatch}} >
        <NavbarHeader />
        <BrowserRouter>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserRegister} />
            <Route path="/booking/new" exact component={CreateBooking} />
            <Route path="/booking/checkout" exact component={Preview} />
        </BrowserRouter>
      </StateContext.Provider>    
    </>
  )
}

export default App
