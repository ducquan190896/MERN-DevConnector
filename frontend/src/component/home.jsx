import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import {AiOutlineCheck} from 'react-icons/ai'
import {GetProfiles, ResetProfile} from '../actions/profileAction'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profile, profileSuccess, profileMessage} = useSelector(state => state.Profile)

    useEffect(() => {
        dispatch(GetProfiles())
        if(profileSuccess) {
            dispatch(ResetProfile())
        }  
    }, [])


    return (
        <div className="flex flex-col items-left justify-start w-1/2 py-10 mx-auto">
            <h1 className='mb-4 text-4xl text-sky-500 font-bold font-mono'> Communities</h1>
            <p className="font-mono text-xl">Browse and connect with people in the communties</p>
            <div className="my-8 flex flex-col items-center justify-start w-full">
                {profiles && profiles.map(pro => {
                    return (
                        <div className="w-full px-10 py-6 flex justify-between items-center bg-base-100 rounded-lg my-2">
                        <div className="avatar">
                            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 object-contain">
                                <img src={pro.user.avatar} />
                            </div>
                        </div>
                        <div className="flex flex-col items-left jusitfy-center">
                            <h1 className="my-2 font-bold text-2xl font-mono">{pro.user.name}</h1>
                            <p className="mb-2 text-lg font-mono text-zinc-700">{pro.status}</p>
                            <p className="mb-2 text-lg font-mono text-zinc-700">{pro.location}</p>
                            <Link to={`/UserProfile/${pro.user._id}`} className=" my-2 text-center text-lg btn bg-sky-500 py-2 px-8 border-none">View Profile</Link>
    
                        </div>
                        <div className='flex flex-col items-left justify-start'>
                            {pro.skills && pro.skills.map(skill => (
                                <div className='flex inline-flex items-left justify-start'>
                                <AiOutlineCheck className='w-6 h-6 text-sky-500'></AiOutlineCheck>
                                <p className='mx-4 text-sky-500 text-lg font-bold'>{skill}</p>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                    )
                })}
               
            </div>
        </div>
    )
}
export default Home