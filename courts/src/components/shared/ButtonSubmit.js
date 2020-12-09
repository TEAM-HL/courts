import React from 'react'

const SubmitButton = ({name}) => {
    return (
        <div>
            <button class="btn waves-effect waves-light" type="submit" name="action">{name}
            </button> 
        </div>
    )
}

export default SubmitButton
