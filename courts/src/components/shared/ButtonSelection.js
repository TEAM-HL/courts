import React from 'react'

import Button from './ButtonMisc'
import ButtonSubmit from './ButtonSubmit'

const ButtonSelection = () => {

    const style = {
        display: "flex",
    }
    
    return (
        <div style={style}>
            <ButtonSubmit />
            <Button name="Cancel" />
        </div>
    )
}

export default ButtonSelection
