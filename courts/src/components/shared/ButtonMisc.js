import React from 'react'

const Button = (props) => {
    return (
        <React.Fragment>
            <a class="waves-effect waves-light btn">{props.name}</a>
        </React.Fragment>
    )
}

export default Button
