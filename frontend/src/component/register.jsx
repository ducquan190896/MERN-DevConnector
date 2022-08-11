import {useSelector, useDispatch} from 'react-redux'
import {RegisterAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        avatar: ''
    })
    const {name, email, password, password2, avatar} = formdata
    const onChange = async (e) => {
        if(e.target.files) {
         const imageupload = await uploadimage(e.target.files)
         setFormdata(prev => ({...prev, [e.target.name]: imageupload}))
        } else {
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }

    useEffect(() => {
        if(userSuccess) {
            dispatch(ResetUser())
            navigate('/createprofileform')
        }
   
    }, [user, userSuccess])

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('confirm password again')
        } else {
            const obj = {
                name,
                email,
                password,
                avatar
            }
            console.log(obj)
            dispatch(RegisterAction(obj))
            
        }
        
    }

    return (
        <div className='w-1/3 mx-auto py-10 min-h-screen flex flex-col items-left justify-start'>
            <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Sign Up</h1>
            <form onSubmit={onSubmit} action="" className='w-full my-2 flex flex-col items-left justify-center' >
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Name</h2>
                    <input type="text" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='Name' value={name} name='name' onChange={onChange}/>
                                     
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Email</h2>
                    <input type="email" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='email' value={email} name='email' onChange={onChange}/>
                </div>
                <div className='flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Password</h2>
                    <input type="password" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='password' value={password} name='password' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Confirm Password</h2>
                     <input type="password" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='confirm password' value={password2} name='password2' onChange={onChange}/>
                </div>
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Avatar</h2>
                     <input type="file"  placeholder='confirm password' className=' w-full rounded-none focus:outline-none text-lg block input px-0 h-full border-none focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-non'  name='avatar' onChange={onChange}/>                
                </div>
                <button type='submit' className='w-full btn bg-sky-500 border-none rounded-none my-4'>Sign Up</button>
                <div>
              
                </div>
                
            </form>
        </div>
    )
}
export default Register