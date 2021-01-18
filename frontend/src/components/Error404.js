import React from 'react'
import NavbarHeader from '../components/shared/NavbarHeader'

const Error404 = () => {
    return (
        <>
            <div className="container">
            <br/>
                <div className="row">
                    <div className="form-heading col s12 push-m2 m8">
                        <h3>Oops!</h3>
                        <h5>Looks like this page doesn't exist..</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="form-heading col s12 push-m2 m8">
                        <h5>Please click <a href="/">here </a>to return to the homepage.</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error404
