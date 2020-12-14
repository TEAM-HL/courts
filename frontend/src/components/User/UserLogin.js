import React, { useState, useEffect } from "react";

// set initial values 
const initialvalues = {
  id: 0,
  username: '',
  password: ''
}

const UserLogin = () => {

  const [values, setValues] = useState(initialvalues)

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const formSubmit = (e) => {
    e.preventDefault()
    console.log(values)
        
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
            <input type="submit" value="login" className="btn waves-effect waves-light" />
          </form>
          <br/>
          <span>Don't have an account? <strong><a href="/register">Register</a></strong></span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
