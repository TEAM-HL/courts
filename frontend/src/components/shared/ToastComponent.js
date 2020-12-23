import React from 'react'

const ToastComponent = (message) => {

    const notify = () => toast({message})
    return (
        <div>
            <button onClick={notify}>Notify !</button>    
        </div>
    )

export default ToastComponent