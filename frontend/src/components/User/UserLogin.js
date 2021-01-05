import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useGlobalState } from "../../config/store"
// import Error from '../shared/Error'

const UserLogin = () => {
  const history = useHistory()
  
  // define initial user values 
  const initialUserValues = {
    username: "",
    password: "",
  }

  //initial authentication values
  const initialAuth = {authenticated: false}
  
  // set local state for user values
  const [values, setValues] = useState(initialUserValues)

  // set localstate for authentication
  const [authentication, setAuthentication] = useState(initialAuth)

  // destructure store and dispatch from global state
  const {store, dispatch} = useGlobalState()
  // destructure loggedInUser from store
  const {loggedInUser} = store

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value.trim()
    })    
  }
  // hook to update global state for loggedInUser
  useEffect(() => {
    dispatch({
      type: "setLoggedInUser",
      data: values
    })
  }, [values])

  // hook to update global state for Authenticated 
  useEffect(() => {
    dispatch({
      type: "setAuthentication",
      data: authentication
    })
  }, [authentication])
  
  // login user function calling express server
  const loginUser = async (data) => {
    console.log(store)
    try {
      await axios({
          method: "POST",
          data: {
              username: data.username,
              password: data.password
          },
          withCredentials: true, 
          url: "http://localhost:5000/users/login"
      }).then(res => {
          console.log(res)
          if (res.data.success === true) {
            setAuthentication({
              ...authentication,
              authenticated: true
            })
            history.push("/")
            console.log(store)
          }
        })  
      } catch (error) {
        console.log(error)
      }
    }
    
    const formSubmit = (e) => {
      e.preventDefault()
      loginUser(values)
    }

  return (
    <div className="container">
      <div classame="row">
        <div className="col s6">
          <h1>Login</h1>
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
