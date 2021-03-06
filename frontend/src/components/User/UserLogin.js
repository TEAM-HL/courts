import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../../config/api.js'
import { useGlobalState } from "../../config/store"
import M from 'materialize-css'

const UserLogin = () => {
  //initialize materialize
  M.AutoInit()
  // assign history for later use
  const history = useHistory()
  
  // define initial user values 
  const initialUserValues = {
    username: "",
    password: "",
  }

  // set error message local state
  const [errorMessage, setErrorMessage] = useState(null)

  // set local state for user values
  const [values, setValues] = useState(initialUserValues)

  // destructure store and dispatch from global state
  const {store, dispatch} = useGlobalState()

  // destructure loggedInUser from store
  const {loggedInUser} = store

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value.trim(),
    })    
  }
  
  // login user function calling express server
  const loginUser = async (data) => {
    await api({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: data.username,
        password: data.password
      },
      withCredentials: true, 
      url: "/users/login"
    }).then(res => {
      // console.log(`response: ${res}`)
      if (res.data.success === true) {
        console.log("res", res)
        // console.log("username", values.username)
        dispatch({
          type: "setLoggedInUser",
          data: {
            username: values.username,
            userType: res.data.userType
          }
        })
        dispatch({
          type: "setAuthentication",
          data: true
        })
        // checking global state updated
        history.push("/")
      }
    }).catch(error => {
      // error is server is unavailable
      if (error && !error.response) {
        setErrorMessage("There may be a problem with the server. Please try again in a few minutes.")
      }
      // error for wrong password/username
      else if (error && error.response.status === 401) {
        setErrorMessage(error.response.data)
      }
      // any other error
      else if (error)
        setErrorMessage(error)
    })
  }
  
  // error message css styles
  const errorStyles = {
    color: "red"
  }
      // function to run when form is submitted
      const formSubmit = (e) => {
        e.preventDefault()
        loginUser(values)
      }
      
  return (
    <div className="container">
        <form className="main-form" onSubmit={formSubmit}>
            <div className="row">
              <div className="form-heading left-align col s12 push-m2 m8">
                <h3>Login</h3>
              </div>
              <div className="input-field col s12 push-m2 m8">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 push-m2 m8">
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 push-m2 m8">
                <input type="submit" value="submit" className="btn waves-effect waves-light" />
                {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
              <p>Don't have an account?  <strong><a href="/register">Register</a></strong></p>
              </div>
            </div>
        </form>
      </div>
  )
}

export default UserLogin
