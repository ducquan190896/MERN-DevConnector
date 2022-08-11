import Moment from "react-moment"
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {CreatePost, GetAllPosts, ResetPost, LikePost, unLikePost, Deletepost} from '../actions/postAction'

function Postcomponent({postcomponent}) {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {posts, postSuccess, postMessage, post, likeSuccess, unlikeSuccess} = useSelector(state => state.Post)
    const {user} = useSelector(state => state.User)


    if(postcomponent) {
        const {_id, name, avatar, likes, unlikes, comments, text, user: postUser, createdAt} = postcomponent
        return (
            <div className="flex items-left justify-start px-20 bg-base-100 shadow-xl w-full my-4 py-4">
                  <div className="flex flex-col items-center justify-center w-1/4 mr-20">
                    <div className="avatar">
                        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 object-contain">
                            <img src={`http://localhost:5000/${avatar}`} />
                        </div>
                    </div>
                    <h1 className="text-2xl mt-4 text-sky-500 font-bold font-mono">{name}</h1>
                  </div>
                  <div className="flex flex-col items-left justify-start py-6 w-2/4">
                    <p className="text-xl font-mono my-4">{text}</p>
                    <p className="font-mono text-gray-400 text-lg"> Posted at: <Moment format="YYYY/MM/DD">{createdAt}</Moment></p>
                    <div className="flex items-left my-6">
                        <button onClick={() => dispatch(LikePost(_id))} className="btn bg-zinc-300 hover:bg-zinc-400 py-2 px-4 mx-2 border-none rounded-none "><AiFillLike className="w-6 h-6 text-sky-500"/><small className="ml-4 text-xl text-sky-500">{likes && likes.length}</small></button>
                        <button onClick={() => dispatch(unLikePost(_id))}  className="btn bg-zinc-300 hover:bg-zinc-400 py-2 px-4 mx-2 border-none rounded-none "><AiFillDislike className="w-6 h-6 text-zinc-800"/><small className="ml-4 text-xl text-zinc-800">{unlikes && unlikes.length}</small></button>
                        <Link to={`/posts/${_id}/comment`} className="btn bg-sky-500 hover:bg-zinc-400 py-2 px-4 mx-2 border-none rounded-none ">Disccussion <small className="ml-4 text-xl">{comments &&comments.length}</small></Link>
                        {user._id.toString() === postUser.toString() && <button onClick={() => dispatch(Deletepost(_id))} className="btn bg-red-600 hover:bg-zinc-400 py-2 px-4 mx-2 border-none rounded-none font-bold text-2xl">X</button>}
                    </div>
                  </div>
            </div>
        )

    }
} 

export default Postcomponent