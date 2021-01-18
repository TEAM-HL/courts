import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom'
import { StateContext } from './config/store'
import { stateReducer } from './config/stateReducer'
//materialize
import 'materialize-css/dist/css/materialize.min.css'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import BookingSuccess from './components/Booking/BookingSuccess'
import BookingCancel from './components/Booking/BookingCancel'
import UserLogin from './components/User/UserLogin'
import NavbarHeader from './components/shared/NavbarHeader'
import UserRegister from './components/User/UserRegister'
import CheckoutForm from './components/Checkout/CheckoutForm'
import ViewBooking from './components/Booking/ViewBooking'
import CalendarComponent from './components/Dashboard/Calendar'
import UserList from './components/Profile/ViewProfile'
import Contact from './components/Contact/Contact'
//toastify dependencies
import Preview from './components/Checkout/Preview'
import Error404 from './components/Error404'
//toastify 
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// css
import './assets/css/App.css'
import api from './config/api'

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// const stripePromise = loadStripe('pk_test_thG1zqeSc5ZWjKDe6OENpRPe00rgTugo8l');


const App = () => {
  
  // check for user session via cookie
  // and update global context if found
  const checkAuth = async () => {
    await api({
        method: "GET",
        url: "/"
      }).then(res => {
        console.log("response from checkAuth: ", res)
        if (res.status === 200) {
          // update global context
          dispatch({
            type: "setLoggedInUser",
            data: {
              username: res.data.username,
              userType: res.data.userType
            }
          })
          dispatch({
            type: "setAuthentication",
            data: true
          })
        } else {
          // history.push("/login")
        }
      })
    }

    const history = useHistory()
    
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
    
    useEffect(() => {
      checkAuth()
    }, [])

   return (
    <>
      <StateContext.Provider value={{store, dispatch}} >
        <NavbarHeader />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserRegister} />
            <Route path="/booking/success" exact component={BookingSuccess} />
            <Route path="/booking/cancel" exact component={BookingCancel} />
            <Route path="/booking/new" exact component={CreateBooking} />
            <Route path="/booking/view" exact component={ViewBooking} />
            <Route path="/admin/calendar" exact component={CalendarComponent} />
            <Route path="/admin/userlist" exact component={UserList} />
            <Route path="/contact" exact component={Contact}/>
            <Route path="/booking/checkout" exact component={Preview} />
            <Route path="/404" exact component={Error404} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>    
    </>
  )
}

export default App
