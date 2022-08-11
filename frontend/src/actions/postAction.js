import axios from "axios"

export const CreatePost = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/post/createpost', formdata, config)
        dispatch({
            type: 'create_post',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error_post',
            payload: err.message
        })
    }
}
export const ResetPost = () => (dispatch) => {
    dispatch({
        type: 'reset_post'
    })
}
export const GetAllPosts = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/post/getAllpost',  config)
        dispatch({
            type: 'get_posts',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error_post',
            payload: err.message
        })
    }
}
export const Getsinglepost = (postid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/post/singlepost/${postid}`,  config)
        dispatch({
            type: 'get_post',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error_post',
            payload: err.message
        })
    }
}
export const Deletepost = (postid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        const {data} = await axios.delete(`http://localhost:5000/api/post/deletepost/${postid}`,  config)

        dispatch({
            type: 'delete_post',
            payload: {postid, ...data}
        })
    } catch (err) {
        dispatch({
            type: 'error_post',
            payload: err.message
        })
    }
}

export const LikePost = (postid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/post/likepost/${postid}`, {},  config)
        dispatch({
            type: 'like_post',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'like_error',
            payload: err.message
        })
    }
}
export const unLikePost = (postid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/post/unlikepost/${postid}`, {},  config)
        dispatch({
            type: 'unlike_post',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'unlike_error',
            payload: err.message
        })
    }
}
export const LogoutPost = () => (dispatch) => {
    dispatch({
        type: 'logout_post'
    })
}
export const Createcomment = (postid, formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/post/${postid}/createcomment`, formdata,  config)
        dispatch({
            type: 'create_comment',
            payload: data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'error_comment',
            payload: err.message
        })
    }
}

export const Deletecomment = (postid, commentid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
                
            }
        }
        const {data} = await axios.delete(`http://localhost:5000/api/post/${postid}/comment/${commentid}`,  config)
        dispatch({
            type: 'delete_comment',
            payload: commentid
        })
    } catch (err) {
        dispatch({
            type: 'error_comment',
            payload: err.message
        })
    }
}