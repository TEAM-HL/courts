import React from 'react'

import ButtonSecondary from './ButtonSecondary'
import ButtonSubmit from './ButtonSubmit'

const ButtonGroup = ({title}) => {

    const style = {
        display: "flex",
    }
    
    return (
        <div style={style}>
            <ButtonSubmit title={title}/>
            <ButtonSecondary title="Cancel" />
        </div>
    )
}

export default ButtonGroup
