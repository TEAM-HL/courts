export const stateReducer = (state, action) => {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        default: 
            return state
    }
}

