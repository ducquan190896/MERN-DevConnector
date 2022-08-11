const initialState = {
    profiles: [],
    profile: null,
    profileBytoken: null,
    profileSuccess: false,
    profileError: false,
    experienceSuccess: false,
    experienceError: false,
    educationSuccess: false,
    educationError: false,
    profileMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_profiles':
            return {
                ...state,
                profiles: action.payload,
                profileSuccess: true
            }
        case 'get_profile':
            return {
                ...state,
                profile: action.payload,
                profileSuccess: true
            }
        case 'get_profile_token':
                return {
                    ...state,
                    profileBytoken: action.payload,
                    profileSuccess: true
                }
        case 'edit_profile_token':
            return {
                ...state,
                profileBytoken: action.payload,
                profileSuccess: true
            }
        case 'create_profile_token':
                return {
                    ...state,
                    profileBytoken: action.payload,
                    profileSuccess: true
                }
        case 'error_profile':
            return {
                ...state,
                profileError: true,
                profileSuccess: false,
                profileMessage: action.payload
            }
        case 'error_experience':
            return {
                ...state,
                experienceSuccess: false,
                experienceError: true,
                profileMessage: action.payload
            }
        case 'success_experience':
            return {
                ...state,
                experienceSuccess: true,
                experienceError: false,
                profileBytoken: action.payload
            }
        case 'success_education':
            return {
                ...state,
                educationError: false,
                educationSuccess: true,
                profileBytoken: action.payload
            }
        case 'delete_experience':
                return {
                    ...state,
                    experienceSuccess: true,
                    experienceError: false,
                    profileBytoken: action.payload
                }
        case 'delete_education':
                return {
                    ...state,
                    educationError: false,
                    educationSuccess: true,
                    profileBytoken: action.payload
                }
        case 'error_education':
            return {
                ...state,
                educationSuccess: false,
                educationError: true,
                profileMessage: action.payload
            }
        case 'reset_profile':
            return {
                ...state,
                profileSuccess: false,
                profileError: false,
                experienceSuccess: false,
                experienceError: false,
                educationSuccess: false,
                educationError: false,
                profileMessage: null
            }
        case 'logout_profile':
            return {
                ...state,
                profiles: [],
                profile: null,
                profileSuccess: false,
                profileError: false,
                experienceSuccess: false,
                experienceError: false,
                educationSuccess: false,
                educationError: false,
                profileMessage: null
            }
        default:
            return state
    }
}

