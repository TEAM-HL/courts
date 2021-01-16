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
      data: {
        username: data.username,
        password: data.password
      },
      withCredentials: true, 
      url: "/users/login"
    }).then(res => {
      console.log(`response: ${res}`)
      if (res.data.success === true) {
        console.log("username", values.username)
        dispatch({
          type: "setLoggedInUser",
          data: values.username
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
      <div className="row">
        <form className="col s12" onSubmit={formSubmit}>
          <h3>Login</h3>
          <div id="box">
            <div className="row">
              <div className="input-field col s10 m6">
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
              <div className="input-field col s10 m6">
                <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10 m6">
                <input type="submit" value="submit" className="btn waves-effect waves-light" />
                {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </form>
        <p>Don't have an account? <strong><a href="/register">Register</a></strong></p>
      </div>
    </div>
  )
}

export default UserLogin
