import React from 'react'

const Dashboard = (props) => {

    return (
        <div className="container">
            <div>{props.children}</div>
        </div>
    )
}

export default Dashboard