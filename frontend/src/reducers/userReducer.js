const initialState = {
    user: null,
    userSuccess: false,
    userError: false,
    userMessage: null,
    userUpdate: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'login_user':
                return {
                    ...state,
                    user: action.payload,
                    userSuccess: true
                }
        case 'update_user':
                return {
                    ...state,
                    user: action.payload,
                    userSuccess: true
                }
        case 'error_user':
            return {
                ...state,
                userError: true,
                userSuccess: false,
                userMessage: action.payload
            }
        case 'reset_user':
            return {
                ...state,
                userSuccess: false,
                userError: false,
                userMessage: null,
                userUpdate: false
            }
        case 'logout_user':
            return {
                ...state,
                user: null,
                userSuccess: false,
                userError: false,
                userMessage: null,
                userUpdate: false
            }
        default :
            return state
    }
}
