import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PrivateRoute() {
    const {user} = useSelector(state => state.User)

    return (
        <>
        {user ? <Outlet/> : <Navigate to='/login'></Navigate>}
        </>
    )
}

export default PrivateRoute