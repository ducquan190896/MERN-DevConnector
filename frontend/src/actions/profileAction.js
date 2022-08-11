import axios from 'axios'


export const GetProfiles = () => async (dispatch, getState) => {
    try {
        const {data} = await axios.get('http://localhost:5000/api/profile/getallprofiles')
        console.log(data)
        dispatch({
            type: 'get_profiles',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_profile',
            payload: err.message
        })
    }
}
export const GetSingleProfile = (userid) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(`http://localhost:5000/api/profile/getsingleprofile/${userid}`)
        console.log(data)
        dispatch({
            type: 'get_profile',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_profile',
            payload: err.message
        })
    }
}

export const ResetProfile = () => async (dispatch) => {
    dispatch({
        type: 'reset_profile'
    })
}

export const GetProfileByToken = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const {data} = await axios.get('http://localhost:5000/api/profile/getcurrentprofile', config)
        console.log(data)
        dispatch({
            type: 'get_profile_token',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_profile',
            payload: err.message
        })
    }
}

export const EditProfileByToken = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('http://localhost:5000/api/profile/updateprofile', formdata, config)
        console.log(data)
        dispatch({
            type: 'edit_profile_token',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_profile',
            payload: err.message
        })
    }
}
export const CreateProfileByToken = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:5000/api/profile/createprofile', formdata, config)
        console.log(data)
        dispatch({
            type: 'create_profile_token',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_profile',
            payload: err.message
        })
    }
}

export const AddExperience = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:5000/api/profile/createexperience', formdata, config)
        console.log(data)
        dispatch({
            type: 'success_experience',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_experience',
            payload: err.message
        })
    }
}
export const AddEducation = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:5000/api/profile/createeducation', formdata, config)
        console.log(data)
        dispatch({
            type: 'success_education',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_education',
            payload: err.message
        })
    }
}

export const DeleteExperience = (experienceid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/profile/deleteexperience/${experienceid}`, {}, config)
        console.log(data)
        dispatch({
            type: 'delete_experience',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_experience',
            payload: err.message
        })
    }
}
export const DeleteEducation = (educationid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/profile/deleteeducation/${educationid}`, {}, config)
        console.log(data)
        dispatch({
            type: 'delete_education',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_education',
            payload: err.message
        })
    }
}