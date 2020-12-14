import React from 'react'

const SubmitButton = ({title}) => {
    return (
        <div>
            <button class="btn waves-effect waves-light" type="submit" name="action">{title}
            </button> 
        </div>
    )
}

export default SubmitButton
