import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { useGlobalState } from "../../config/store"
import Error from '../shared/Error'

const UserLogin = () => {
  
  // set initial values for local state 
  const initialvalues = {
    username: "",
    password: ""
  }

  const [values, setValues] = useState(initialvalues)
  // destructure store and dispatch from global state
  const {store, dispatch} = useGlobalState()
  // destructure loggedInUser from store
  const {loggedInUser} = store

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })    
  }

  useEffect(() => {
    dispatch({
      type: "setLoggedInUser",
      data: values,
    })
  }, [values])
  
  const loginUser = async (data) => {
    try {
      await axios({
          method: "POST",
          data: {
              username: data.username,
              password: data.password
          },
          withCredentials: true, 
          url: "http://localhost:5000/users/login",
      }).then(res => {
          console.log(res)
          if (res.data.success === true) {
              setValues({username: data.username})
          }
      })  
    } catch (error) {
      console.log(error)
    }
  }
  
  const formSubmit = async (e) => {
    e.preventDefault()
    await loginUser(values)
    console.log(store)
    // if (store.loggedIn === true) {
    //   <Redirect to ="/" />
    // }
  }

  return (
    <div className="container">
      <div classame="row">
        <div className="col s6">
          <h1>Login</h1>
          <Error />
          <form onSubmit={formSubmit}>
            <label htmlFor="username">
                Username
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleInputChange}
                />
            </label>
            <label htmlFor="password">
                Password
                <input
                name="password"
                type="text"
                value={values.password}
                onChange={handleInputChange}
                />
            </label>
            <input type="submit" value="submit" className="btn waves-effect waves-light" />
          </form>
          <br/>
          <span>Don't have an account? <strong><a href="/register">Register</a></strong></span>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
