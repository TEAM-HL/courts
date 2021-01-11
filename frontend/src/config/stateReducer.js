export const stateReducer = (state, action) => {
    switch(action.type) {
        case "setLoggedInUser": {
            console.log(action.data)
            return {
                ...state,
                loggedInUser: action.data
            }
            
        }
        case "setAuthentication": {
            console.log(action.data)
            return {
                ...state,
                authenticated: action.data
            }
        }
        case "RESET_STATE": {
            return {
                ...state = undefined
            }
        }
        default: 
            return state
    }
}