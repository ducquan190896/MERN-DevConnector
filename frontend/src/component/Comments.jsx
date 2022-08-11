import Moment from "react-moment"
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Getsinglepost, ResetPost, Createcomment, Deletecomment} from '../actions/postAction'
import Postcomponent from './post'
import Commentcomponent from "./comment"

function Comments() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {posts, postSuccess, postMessage, post,  likeSuccess, unlikeSuccess,  commentSuccess} = useSelector(state => state.Post)
    const {postid} = useParams()
    const [commentinput, setCommentinput] = useState('')
    

    useEffect(() => {
        dispatch(Getsinglepost(postid))
    }, [dispatch,  postid])
    // useEffect(() => {
    //     if(!post) {
    //         dispatch(Getsinglepost(postid))
    //     }
    // }, [post])

    useEffect(() => {
        if(postSuccess || likeSuccess || unlikeSuccess || commentSuccess) {
            dispatch(Getsinglepost(postid))
            dispatch(ResetPost())
        }

    }, [ likeSuccess, unlikeSuccess,  commentSuccess])

    const onChange = (e) => {
        setCommentinput(e.target.value)
        
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(Createcomment(postid, {text: commentinput}))
        setCommentinput('')
    
    }


   if(post) {
  
    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col items-left justify-start'>
             <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Comments</h1>
             {post && <Postcomponent postcomponent={post}></Postcomponent>}
             <p className='py-2 px-4 w-full bg-sky-500 text-white font-mono my-4'>leave your comment here...</p>
             <form action="" onSubmit={onSubmit}>
                <textarea type="textArea" className='input bg-base-300 shadow-xl border-2 w-full h-28 border-sky-400 focus:outline-none text-lg'  placeholder='type your post here...' value={commentinput} onChange={onChange}/>
                <button type='submit' className='btn rounded-none bg-sky-500 px-6 py-4 border-none my-4'>Submit</button>
             </form>
             <div className='flex flex-col items-left justify-start my-4'>
                {post && post.comments && post.comments.length > 0 && post.comments.map(c => <Commentcomponent commentcomponent={c}></Commentcomponent>)}
             </div>
        </div>
    )
   }
}
export default Comments