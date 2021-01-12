import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from '../../config/api.js'
import { useGlobalState } from "../../config/store"
import M from 'materialize-css'

const UserLogin = () => {
  //initialize materialise
  M.AutoInit()
  // use history
  const history = useHistory()
  console.log("**")
  
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
    await axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password
      },
      withCredentials: true, 
      url: "/users/login"
    }).then(res => {
      // console.log(res)
      if (res.data.success === true) {
        dispatch({
          type: "setLoggedInUser",
          data: values.username
        })
          dispatch({
            type: "setAuthentication",
            data: true
        })
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
      // checking global state updated
      console.log(store)
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
                  required
                />
            </label>
            <label htmlFor="password">
                Password
                <input
                name="password"
                type="text"
                value={values.password}
                onChange={handleInputChange}
                required
                />
            </label>
            <input type="submit" value="submit" className="btn waves-effect waves-light" />
            {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
          </form>
          <br/>
          <span>Don't have an account? <strong><a href="/register">Register</a></strong></span>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
