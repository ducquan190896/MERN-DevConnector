import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {EditProfileByToken, GetProfileByToken, ResetProfile, AddExperience} from '../actions/profileAction'


function ExperienceForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profileBytoken, profileSuccess, profileMessage, experienceSuccess } = useSelector(state => state.Profile)
    const [formdata, setFormdata] = useState({
            title: '',
            location: '',
            company: '',
            description: '',
            from: '',
            to: '',
            current: false
    })

    const {title, location, company, description, from, to, current} = formdata
    const onChange = async (e) => {
         
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
       if(experienceSuccess) {
        dispatch(ResetProfile())
        navigate('/dashboard')
       }   
    }, [dispatch, experienceSuccess])

    useEffect(() => {
           if(!profileBytoken) {
            dispatch(GetProfileByToken())
           }      
        }, [profileBytoken])

    const onSubmit = (e) => {
        e.preventDefault()
        if(current) {
            setFormdata(prev => ({...prev, to: ''}))
        }

        console.log(formdata)
       dispatch(AddExperience(formdata))
       setFormdata({
        title: '',
        location: '',
        company: '',
        description: '',
        from: '',
        to: '',
        current: false
    })
    }

    return (
        <div className='w-1/3 mx-auto py-10 min-h-screen flex flex-col items-left justify-start'>
            <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Add experience</h1>
            <form onSubmit={onSubmit} action="" className='w-full my-2 flex flex-col items-left justify-start' >
               
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>What is Title</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your title' value={title} name='title' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your location</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your location' value={location} name='location' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your company</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your company' value={company} name='company' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your description</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your description' value={description} name='description' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>from</h2>
                    <input type="date" className='w-full input input-bordered rounded-none focus:outline-none' placeholder=' from' value={from} name='from' onChange={onChange}/>
                </div>
               {!current && (
                    <div className=' flex flex-col w-full'>
                        <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'> to</h2>
                        <input type="date" className='w-full input input-bordered rounded-none focus:outline-none' placeholder=' to' value={to} name='to' onChange={onChange}/>
                    </div>
               ) }
                <div className=' form-control w-1/4'>
                    <label className='label cursor-pointer'>
                        <h2 className='label-text'> current job</h2>
                         <input type="checkbox" className='checkbox checkbox-accent' value={current} checked={current} name='current' onChange={(e) => setFormdata(prev => ({...prev, current: !prev.current})) }/>
                    </label>
                    
                </div>
               
                <button type='submit' className='w-full btn bg-sky-500 border-none rounded-none my-4'>Create Your Experience</button>
                <div>
              
                </div>
                
            </form>
        </div>
    )
}



export default ExperienceForm