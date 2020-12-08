import React from 'react'
// components 
import Dashboard from './components/Dashboard/Dashboard'
import CreateBooking from './components/Booking/CreateBooking'

const App = () => {
  return (
    <React.Fragment >
      <Dashboard>
        <CreateBooking />
      </Dashboard>
    </React.Fragment>
  )
}

export default App
