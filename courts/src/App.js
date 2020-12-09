import React from 'react'
// css 
import 'materialize-css/dist/css/materialize.min.css'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'
import UserLogin from './components/User/UserLogin'

const App = () => {
  return (
    <React.Fragment>
      <Dashboard>
        <UserLogin />
      </Dashboard>
    </React.Fragment>
  )
}

export default App
