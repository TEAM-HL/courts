import React from 'react'

const Button = ({title}) => {
    return (
        <React.Fragment>
            <a href="#" class="waves-effect waves-light btn">{title}</a>
        </React.Fragment>
    )
}

export default Button
