import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import {BsFillPersonFill} from 'react-icons/bs'
import {GiCaptainHatProfile} from 'react-icons/gi'
import {SiHandshake} from 'react-icons/si'
import {AiOutlineEdit} from 'react-icons/ai'
import {GetProfileByToken, ResetProfile, DeleteEducation, DeleteExperience} from '../actions/profileAction'
import Moment from 'react-moment'

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profileBytoken, profileSuccess, profileMessage, experienceSuccess, educationSuccess} = useSelector(state => state.Profile)
    useEffect(() => {
        dispatch(GetProfileByToken())
    }, [userError])
   

    useEffect(() => {
        if(profileSuccess) {
            dispatch(ResetProfile())
        } 
        if(experienceSuccess) {
            dispatch(ResetProfile())
        }
        if(educationSuccess) {
            dispatch(ResetProfile())
        }
    }, [profileSuccess, , experienceSuccess, educationSuccess])

    const deleteExbtn = (exID) => {
        console.log(exID)
        dispatch(DeleteExperience(exID))
    }
    const deleteEdbtn = (edID) => {
        console.log(edID)
        dispatch(DeleteEducation(edID))
    }

    if(profileBytoken) {
        const {social, experience, education, location, status, skills, user} = profileBytoken
    return (
        <div className="flex flex-col items-left justify-center w-1/2 mx-auto mt-10 pb-10">
            <h1 className='mb-4 text-4xl text-sky-500 font-bold font-mono'> Dashboard</h1>
            <h2 className='text-2xl font-mono inline-flex flex items-end'><BsFillPersonFill className='mr-6 w-10 h-10 text-center'/>Wellcome {user.name}</h2>
            <div className='flex items-center my-4'>
                <Link to='/editprofileform' className='btn bg-sky-500 mr-4 px-6 py-2 rounded-none border-0'><AiOutlineEdit className='mr-6 w-6 h-6 text-center'/>Edit Profile</Link>
                <Link to='/experienceform' className='btn bg-sky-500 mr-4 px-6 py-2 rounded-none border-0'><SiHandshake className='mr-6 w-6 h-6 text-center'/>Add Experience</Link>
                <Link to='/educationform' className='btn bg-sky-500 mr-4 px-6 py-2 rounded-none border-0'> <GiCaptainHatProfile className='mr-6 w-6 h-6 text-center'/>Add Education</Link>
            </div>
            <h2 className='text-2xl font-bold inline-flex flex items-end my-4'>Experience Credentials</h2>
           
                <table className='tabel table-zebra w-full my-4'>
                    <thead>
                        <tr>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>Company</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>Title</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>Years</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience && experience.map(ex => {
                            return (
                        <tr>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'>{ex.company}</th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'>{ex.title}</th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'><Moment format="YYYY/MM/DD">{ex.from}</Moment> - <Moment format="YYYY/MM/DD">{ex.to}</Moment></th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'><button onClick={() => deleteExbtn(ex._id)} className='btn bg-red-500 border-0 rounded-none'>Delete</button></th>

                        </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
           
                <h2 className='text-2xl font-bold inline-flex flex items-end my-4'>Education Credentials</h2>
                <table className='tabel table-zebra w-full my-4'>
                    <thead>
                        <tr>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>School</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>Degree</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'>Years</th>
                            <th className='font-bold text-xl w-1/4 bg-gray-300 mr-4 py-2 px-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {education && education.map(ed => {
                            return (
                        <tr>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'>{ed.school}</th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'>{ed.degree}</th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'><Moment format="YYYY/MM/DD">{ed.from}</Moment > - <Moment format="YYYY/MM/DD">{ed.to}</Moment></th>
                            <th className='text-lg font-normal w-1/4 bg-zinc-100 py-4 px-4'><button onClick={() => deleteEdbtn(ed._id)} className='btn bg-red-500 border-0 rounded-none'>Delete</button></th>

                        </tr>
                            )
                        })}
                        
                    </tbody>
                </table>

                <button className='btn bg-red-500 px-4 w-60 rounded-none border-0 my-6'>Delete My Account</button>
        </div>
    )}

}

export default Dashboard