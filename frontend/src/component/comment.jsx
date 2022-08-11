import Moment from "react-moment"
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link } from 'react-router-dom'
import { ResetPost,  Getsinglepost, Deletecomment} from '../actions/postAction'

function Commentcomponent({commentcomponent})  {
    const {_id, user: commentUser, name, avatar, date, text} = commentcomponent
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {postid} = useParams()
    const {posts, postSuccess, postMessage, post, likeSuccess, unlikeSuccess} = useSelector(state => state.Post)
    const {user} = useSelector(state => state.User)


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
                <p className="font-mono text-gray-400 text-lg"> Posted at: <Moment format="YYYY/MM/DD">{date}</Moment></p>
              
                {user._id.toString() === commentUser.toString() && <button onClick={() => dispatch(Deletecomment( postid, _id))} className="btn bg-red-600 hover:bg-zinc-400 py-2 px-4 mt-4 w-14 border-none rounded-none font-bold text-2xl">X</button>}
              
                
              </div>
        </div>
    )
} 



export default Commentcomponent