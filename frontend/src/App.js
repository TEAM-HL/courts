import React, { useReducer } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StateContext } from './config/store'
import { stateReducer } from './config/stateReducer'
// stripe dependencies 
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
//materialize
import 'materialize-css/dist/css/materialize.min.css'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import UserLogin from './components/User/UserLogin'
import Navbar from './components/shared/Navbar'
import UserRegister from './components/User/UserRegister'
import CheckoutForm from './components/Checkout/CheckoutForm'
//toastify dependencies
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

//initialize stripe
const stripePromise = loadStripe("pk_test_thG1zqeSc5ZWjKDe6OENpRPe00rgTugo8l")

const App = () => {
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
        <Navbar />
        <BrowserRouter>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserRegister} />
            <Route path="/booking/new" exact component={CreateBooking} />
            <Elements stripe={stripePromise}>
              <Route path="/booking/checkout" exact component={CheckoutForm} />
            </Elements>
        </BrowserRouter>
      </StateContext.Provider>    
    </>
  )
}

export default App
