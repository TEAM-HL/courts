import React from 'react'

const Dashboard = (props) => {

    const styles = {
        border: '1px solid red',
        height: '90vh',
        width: 'auto',
        display: 'flexbox',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div>
            <div style={styles}>{props.children}</div>
        </div>
    )
}

export default Dashboard