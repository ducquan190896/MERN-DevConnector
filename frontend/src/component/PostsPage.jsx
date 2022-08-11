import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Moment from 'react-moment'
import {CreatePost, GetAllPosts, ResetPost, LikePost, unLikePost} from '../actions/postAction'
import Postcomponent from './post'

function PostsPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {posts, postSuccess, postMessage, post, likeSuccess, unlikeSuccess} = useSelector(state => state.Post)
    const [postinput, setPostinput] = useState('')
    
    useEffect(() => {
      
            dispatch(GetAllPosts())
        
    }, [])
    useEffect(() => {
        if(postSuccess || likeSuccess || unlikeSuccess) {
            dispatch(ResetPost())
        }

    }, [postSuccess, likeSuccess, unlikeSuccess])


    const onChange = (e) => {
        setPostinput(e.target.value)
        console.log(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(CreatePost({text: postinput}))
        setPostinput('')
    }

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col items-left justify-start'>
             <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Posts</h1>
             <p className='text-lg font-mono'>Welcome to the communities</p>
             <p className='py-2 px-4 w-full bg-sky-500 text-white font-mono my-4'>Say Something...</p>
             <form action="" onSubmit={onSubmit}>
                <textarea type="textArea" className='input bg-base-300 shadow-xl border-2 w-full h-28 border-sky-400 focus:outline-none text-lg'  placeholder='type your post here...' value={postinput} onChange={onChange}/>
                <button type='submit' className='btn rounded-none bg-sky-500 px-6 py-4 border-none my-4'>Submit</button>
             </form>
             <div className='flex flex-col items-left justify-start my-4'>
                {posts && posts.length > 0 && posts.map(p => <Postcomponent key={p._id} postcomponent={p}></Postcomponent>)}
             </div>
        </div>
    )
}

export default PostsPage