import React from 'react'

import Button from './ButtonMisc'
import ButtonSubmit from './ButtonSubmit'

const ButtonGroup = () => {

    const style = {
        display: "flex",
    }
    
    return (
        <div style={style}>
            <ButtonSubmit title="Login"/>
            <Button title="Cancel" />
        </div>
    )
}

export default ButtonGroup
