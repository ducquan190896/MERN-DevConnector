
import {useSelector, useDispatch} from 'react-redux'
import { LogoutAction} from '../actions/userAction'
import {useNavigate, Link} from 'react-router-dom' 
function Navbar() {
    const dispatch = useDispatch()
    const {user, userSuccess, userError, userMessage, userUpdate} = useSelector(state => state.User)
   const navigate = useNavigate()
    const onClick = (e) => {
      dispatch(LogoutAction())
    }

    return (
    <div className="w-full h-14 text-white px-10 bg-zinc-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono">DevConnector</h1>
        <div className="flex items-center justify-center">
            <Link to='/' className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono mr-8'>Developer</Link>
           {!user ? (
            <>
             <Link to='/Register' className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono mr-8'>Register</Link>
            <Link to='/Login' className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono'>Login</Link>
            </>
           ) : 
           <>
            <button onClick={onClick} className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono mr-8'>Logout</button>
            <Link to='/dashboard' className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono mr-8'>Dashboard</Link>
            <Link to='/posts' className='text-xl hover:text-lg hover:text-gray-400 font-bold font-mono mr-8'>Posts</Link>
           </>
           
           }
        </div>
    </div>
    )
}

export default Navbar 