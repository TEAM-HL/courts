import React, { useState, useEffect } from "react";
import {loginUser} from "../../services/loginUser"
import { useGlobalState } from "../../config/store"

const UserLogin = () => {
  
  // set initial values for local state 
  const initialvalues = {
    id: 0,
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
      data: values
    })
  }, [values])
  
  
  const formSubmit = (e) => {
    e.preventDefault()
    console.log(loggedInUser)
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
  );
};

export default UserLogin;
