import React from 'react'
import { useForm } from 'react-hook-form'

const UserLogin = () => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)

    // console.log(errors)

    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Username:</label>
                            <input 
                                name="username" 
                                type="text" 
                                ref={register({ 
                                    required: {
                                        value: true,
                                        message: "You must enter a username" 
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{4,10}$/,
                                        message: "must use at least 4 characters"    
                                    }})}
                            />
                            {errors.username && (
                                <p style={{color: "red"}}>{errors.username.message}</p>
                            )}
                        <label>Password:</label>
                            <input 
                                name="password" 
                                type="text" 
                                ref={register({ 
                                    required: {
                                        value: true,
                                        message: "You must enter a password"
                                    }, 
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{6,}$/i,
                                        message: "Must use at least 6 characters. Must be a combination of uppercase & lowercase letters and numbers" 
                                    }})} 
                            />
                            {errors.password && (
                            <p style={{color: "red"}}>{errors.password.message}</p>
                            )}
                            <input type="submit" className="btn waves-effect waves-light" /> 
                    </form>    
                </div>
            </div>
        </div>
    )
}

export default UserLogin
