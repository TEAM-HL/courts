import React from 'react'

// components 
import ButtonSubmit from '../shared/ButtonSubmit'

const UserLogin = () => {
    return (
        <div className="row">
            <div className="col s6">
            <h1>Login</h1>
                <form>
                    <label>
                        Username:
                        <input />
                    </label>
                    <label>
                        Password:
                        <input />
                    </label>
                </form>    
                <ButtonSubmit name="Login"/>
            </div>
        </div>
    )
}

export default UserLogin
