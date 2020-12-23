export const stateReducer = (state, action) => {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data,
            }
            
        }
        case "setAuthentication": {
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