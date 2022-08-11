const initialState = {
    posts: [],
    post: null,
    myposts: [],
    postSuccess: false,
    postError: false,
    postMessage: null,
    commentSuccess: false,
    commentError: false,
    likeSuccess: false,
    likeError: false,
    unlikeSuccess: false,
    unlikeError: false,
    commentSuccess: false,
    commentError: false,
    commentMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_posts':
            return {
                ...state,
                posts: action.payload,
                postSuccess: true
            }
        case 'get_post':
            return {
                ...state,
                postSuccess: true,
                post: action.payload
            }
        case 'create_post':
            return {
                ...state,
                postSuccess: true,
                posts: [...state.posts, action.payload]
            }
        case 'delete_post':
            return {
                ...state,
                postSuccess: true,
                posts: state.posts.filter(p => p._id.toString() !== action.payload.postid.toString()),
                postMessage: action.payload.message
            }
        case 'like_post':
            return {
                ...state,
                likeSuccess: true,
                posts: state.posts.map(p => p._id.toString() === action.payload._id.toString() ? action.payload : p)
            }  
        case 'like_error':
            return {
                ...state,
                likeError: true,
                postMessage: action.payload
            }
         case 'unlike_post':
                return {
                    ...state,
                    unlikeSuccess: true,
                    posts: state.posts.map(p => p._id.toString() === action.payload._id.toString() ? action.payload : p)
                }  
         case 'unlike_error':
                return {
                    ...state,
                    unlikeError: true,
                    postMessage: action.payload
                }
        case 'reset_post':
            return {
                ...state,
                postSuccess: false,
                postError: false,
                commentSuccess: false,
                commentError: false,
                likeSuccess: false,
                likeError: false,
                unlikeSuccess: false,
                unlikeError: false,
                commentSuccess: false,
                commentError: false
                
            }
        case  'error_post':
            return {
                ...state,
                postError: true,
                postMessage: action.payload
            }
        case 'logout_post':
            return {
                posts: [],
                post: null,
                myposts: [],
                postSuccess: false,
                postError: false,
                postMessage: null,
                commentSuccess: false,
                commentError: false,
                likeSuccess: false,
                likeError: false,
                unlikeSuccess: false,
                unlikeError: false,
                commentSuccess: false,
                commentError: false,
                commentMessage: null
            } 
        case 'create_comment': 
            return {
                ...state,
                commentSuccess: true,
                post: action.payload
            }
        case 'delete_comment': 
            console.log(action.payload)
            return {
                ...state,
                commentSuccess: true
            }
        case 'error_comment':
            return {
                ...state,
                commentError: true,
                commentMessage: action.payload
            }
        default: 
        return state
    }
}