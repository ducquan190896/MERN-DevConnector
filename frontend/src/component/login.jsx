import {useSelector, useDispatch} from 'react-redux'
import {LoginAction, uploadimage, ResetUser} from '../actions/userAction'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })
    const { email, password} = formdata
    const onChange = async (e) => {
       
        
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
        
    }

    useEffect(() => {
        if(userSuccess) {
            dispatch(ResetUser())
            navigate('/')
        }
   
    }, [user, userSuccess])

    const onSubmit = (e) => {
        e.preventDefault()
       dispatch(LoginAction(formdata))
  
        
    }

    return (
        <div className='w-1/3 mx-auto py-10 min-h-screen flex flex-col items-left justify-start'>
            <h1 className='mb-8 text-4xl text-sky-500 font-bold font-mono'>Login</h1>
            <form onSubmit={onSubmit} action="" className='w-full my-2 flex flex-col items-left justify-center' >
               
                <div className=' flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Email</h2>
                    <input type="email" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='email' value={email} name='email' onChange={onChange}/>
                </div>
                <div className='flex flex-col w-full'>
                    <h2 className=' my-2 text-xl text-sky-500 font-mono font-bold'>Password</h2>
                    <input type="password" className='w-full input input-bordered rounded-none focus:outline-none' placeholder='password' value={password} name='password' onChange={onChange}/>
                </div>
               
                <button type='submit' className='w-full btn bg-sky-500 border-none rounded-none my-4'>Sign Up</button>
                <div>
              
                </div>
                
            </form>
        </div>
    )
}
export default Login