import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {GetSingleProfile, ResetProfile} from '../actions/profileAction'
import {AiOutlineCheck} from 'react-icons/ai'
import {FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram} from 'react-icons/fa'

function UserProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userid} = useParams()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profile, profileSuccess, profileMessage} = useSelector(state => state.Profile)
    useEffect(() => {
        dispatch(GetSingleProfile(userid))
        if(profileSuccess) {
            dispatch(ResetProfile())
        }
    }, [userid])
    useEffect(() => {
        if(profileSuccess) {
            dispatch(ResetProfile())
        }
    }, [profileSuccess, profile])

    if(profile) {
        const {social, _id, user, location, status, skills, experience, education, updatedAt} = profile
    return (
        <div className="flex flex-col items-center justify-center w-1/2 mx-auto mt-10 pb-10">
            <div className='flex w-full items-center justify-center flex-col py-6 bg-sky-400 text-white mb-2'>
                    <div className="avatar">
                        <div className="w-60 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2 object-contain">
                            <img src='/image-1660126833204.jpeg' />
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold font-mono mt-4 mb-2'>{user.name}</h1>
                    <h2 className="my-2 font-bold text-2xl font-mono">{status}</h2>
                    <p className='text-lg font-bold font-mono'>{location}</p>
                    <div className='flex inline flex items-end justify-center mt-4'>
                        {social && social.facebook && <Link to={social.facebook}><FaFacebook className='mr-4 w-8 h-8 text-white font-bold'/></Link>}
                        {social && social.youtube && <Link to={social.youtube}><FaYoutube className='mr-4 w-8 h-8 text-white font-bold'/></Link>}
                        {social && social.twitter && <Link to={social.twitter}><FaTwitter className='mr-4 w-8 h-8 text-white font-bold'/></Link>}
                        {social && social.linkedin && <Link to={social.linkedin}><FaLinkedin className='mr-4 w-8 h-8 text-white font-bold'/></Link>}
                        {social && social.instagram && <Link to={social.instagram}><FaInstagram className='mr-4 w-8 h-8 text-white font-bold'/></Link>}
                    </div>
            </div>
            <div className='bg-gray-300 flex flex-col items-center justify-center w-full py-4 px-10 mb-2'>
                <div className=' py-4 border-b-2 border-b-gray-400 w-full px-8 flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold font-mono text-sky-500'>{user.name}</h1>
                    <p className='text-lg font-mono mt-2'>{user.email}</p>
                </div>
                <div className=' py-4 w-full px-8 flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold font-mono text-sky-500'>Skills</h1>
                    <div className='flex inline-flex mt-2 w-full flex-wrap'>
                        {skills && skills.map(skill => {
                        return (
                            <>  
                                 <AiOutlineCheck className='w-6 h-6 text-sky-500'></AiOutlineCheck>
                                <p className='text-lg font-mono mr-6'>{skill}</p>                  
                            </>
                        )
    })}
                       
                    </div>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col items-left justify-start w-3/5 border-2 border-gray-400 shadow-2xl px-8'>
                    <h1 className='text-4xl text-sky-500 font-bold font-mono mt-4 mb-2'>experience</h1>
                    <div className='flex flex-col items-left justify-center mt-6'>
                        {/* loop experience */}
                        {experience && experience.map(ex => {
                            return (
                        <div className='flex flex-col items-left justify-center my-2 py-2 border-b-2 border-gray-400'>
                            <h1 className='font-bold text-xl font-mono'>{ex.company}</h1>
                            <div className='inline-flex flex'>
                                <h1 className='font-bold text-lg text-zinc-700 '>Position:</h1>
                                <p className='text-lg font-mono ml-6 font-normal'>{ex.title}</p>
                            </div>
                            <h1 className='font-bold text-lg text-zinc-700 '>Description: <small className='text-lg font-normal font-mono ml-4'>{ex.description}</small></h1>
                        </div>
                            )
                        })}
                        
                    </div>
                </div>
                <div className='flex flex-col items-left justify-start w-2/5 border-2 border-gray-400 shadow-2xl px-8 ml-2 pb-4'>
                    <h1 className='text-4xl text-sky-500 font-bold font-mono mt-4 mb-2'>Education</h1>
                    <div className='flex flex-col items-left justify-center mt-6'>
                        {/* loop experience */}
                        {education && education.map(ed => {
                            return (
                                <div className='flex flex-col items-left justify-center my-2 py-2 border-b-2 border-gray-400'>
                            <h1 className='font-bold text-xl font-mono'>{ed.school}</h1>
                            <div className='inline-flex flex'>
                                <h1 className='font-bold text-lg text-zinc-700 '>Degree:</h1>
                                <p className=' font-normal text-lg font-mono ml-6'>{ed.degree}</p>
                            </div>
                           
                            <h1 className='font-bold text-lg text-zinc-700 '>Description: <small className='text-lg font-normal font-mono ml-4'>{ed.description}</small></h1>
                            
                            
                        </div>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default UserProfile