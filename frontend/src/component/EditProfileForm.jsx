import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {EditProfileByToken, GetProfileByToken, ResetProfile} from '../actions/profileAction'


function EditProfileForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profileBytoken, profileSuccess, profileMessage} = useSelector(state => state.Profile)
    const [formdata, setFormdata] = useState({
      status: '',
      location: '',
      skills: '',
        facebook: '',
        twitter: '',
        youtube: '',
        linkedin: '',
        instagram: '',
    })

    useEffect(() => {
        if(profileBytoken) {
            setFormdata({
                status: profileBytoken.status,
                location: profileBytoken.location,
                skills: profileBytoken.skills.join(', '),
                facebook: profileBytoken.facebook ? profileBytoken.facebook : '',
                twitter: profileBytoken.twitter ? profileBytoken.twitter : '',
                linkedin: profileBytoken.linkedin ? profileBytoken.linkedin : '',
                youtube: profileBytoken.youtube ? profileBytoken.youtube : '',
                instagram: profileBytoken.instagram ? profileBytoken.instagram : '',
            })
        }
    }, [profileBytoken])

    const [socialbtn, setSocialbtn] = useState(false)

    const { status, location, skills, twitter, youtube, linkedin, instagram, facebook} = formdata
    const onChange = async (e) => {
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
       if(profileSuccess) {
        dispatch(ResetProfile())
        navigate('/dashboard')
       }
  
     
    }, [dispatch, profileSuccess])

    useEffect(() => {
      
           if(!profileBytoken) {
            dispatch(GetProfileByToken())
           }
         
        }, [profileBytoken])

    const onSubmit = (e) => {
        e.preventDefault()
       dispatch(EditProfileByToken(formdata))
       setFormdata({
        status: '',
        location: '',
        skills: '',
          facebook: '',
          twitter: '',
          youtube: '',
          linkedin: '',
          instagram: '',
    })
    
        
    }

    return (
        <div className='w-1/3 mx-auto py-10 min-h-screen flex flex-col items-left justify-start'>
            <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Edit Profile</h1>
            <form onSubmit={onSubmit} action="" className='w-full my-2 flex flex-col items-left justify-center' >
               
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>What is your position</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your postion' value={status} name='status' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your location</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your location' value={location} name='location' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your skills</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your skills' value={skills} name='skills' onChange={onChange}/>
                </div>
                <button onClick={(e) => setSocialbtn(prev => !prev)} type='button' className='btn bg-sky-500 px-8 py-4 rounded-none my-4 border-none w-72'>Add Social Networdks Link</button>
                
                {socialbtn && (
                    <>
                    <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your facebook</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your facebook' value={facebook} name='facebook' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your youtube</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your youtube' value={youtube} name='youtube' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'> your twitter</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your twitter' value={twitter} name='twitter' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your linkedin</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your linkedin' value={linkedin} name='linkedin' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your instagram</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your instagram' value={instagram} name='instagram' onChange={onChange}/>
                </div>
                    </>
                )}
               
                <button type='submit' className='w-full btn bg-sky-500 border-none rounded-none my-4'>Create Your Profile</button>
                <div>
              
                </div>
                
            </form>
        </div>
    )
}

export default EditProfileForm