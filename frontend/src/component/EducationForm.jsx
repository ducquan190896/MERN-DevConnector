import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {EditProfileByToken, GetProfileByToken, ResetProfile, AddExperience, AddEducation} from '../actions/profileAction'


function EducationForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const {profiles, profileBytoken, profileSuccess, profileMessage, experienceSuccess, educationSuccess } = useSelector(state => state.Profile)
    const [formdata, setFormdata] = useState({
           school: '',
           degree: '',
           fieldofstudy: '',
           from: '',
           to: '',
           current: false,
           description: ''
    })

    const {school, degree, fieldofstudy, description, from, to, current} = formdata
    const onChange = async (e) => {
         
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
       if(educationSuccess) {
        dispatch(ResetProfile())
        navigate('/dashboard')
       }   
    }, [dispatch, educationSuccess])

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
       dispatch(AddEducation(formdata))
       setFormdata({
        school: '',
        degree: '',
        fieldofstudy: '',
        description: '',
        from: '',
        to: '',
        current: false
    })
    }

    return (
        <div className='w-1/3 mx-auto py-10 min-h-screen flex flex-col items-left justify-start'>
            <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Add Education</h1>
            <form onSubmit={onSubmit} action="" className='w-full my-2 flex flex-col items-left justify-start' >
               
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>What is School</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your school' value={school} name='school' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your degree</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your degree' value={degree} name='degree' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>your field of study</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='your fieldofstudy' value={fieldofstudy} name='fieldofstudy' onChange={onChange}/>
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
                        <h2 className='label-text'> current Education</h2>
                         <input type="checkbox" className='checkbox checkbox-accent' value={current} checked={current} name='current' onChange={(e) => setFormdata(prev => ({...prev, current: !prev.current})) }/>
                    </label>
                    
                </div>
               
                <button type='submit' className='w-full btn bg-sky-500 border-none rounded-none my-4'>Create Your Education</button>
                <div>
              
                </div>
                
            </form>
        </div>
    )
}





export default EducationForm