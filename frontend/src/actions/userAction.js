import axios from 'axios'


export const uploadimage = async (imagefile) =>  {
    try {
        const formdata = new FormData()
        formdata.append('image', imagefile[0])
        console.log(imagefile[0], formdata)
        const config = {
            headers: {
                'Content-Type': 'multipart/formdata'
            }
        }
        const {data} = await axios.post('/api/upload', formdata, config)
        console.log(data)
      return data
    } catch (err) {
        console.log(err.message, err.stack)
    }
}

export const RegisterAction = (formdata) => async (dispatch) => {
    try {
        console.log(formdata)
        const {email, name, password, avatar} = formdata
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:5000/api/user/register', formdata, config)
        console.log(data)
        dispatch({
            type: 'register_user',
            payload: data
        })
        localStorage.setItem('user', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: 'Error_user',
            payload: err.message
        })
    }

}

export const ResetUser = () => (dispatch) => {
    dispatch({
        type: 'reset_user'
    })
}

export const LoginAction = (formdata) => async (dispatch) => {
    try {
        console.log(formdata)
       
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:5000/api/user/login', formdata, config)
        console.log(data)
        dispatch({
            type: 'login_user',
            payload: data
        })
        localStorage.setItem('user', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: 'Error_user',
            payload: err.message
        })
    }

}

export const LogoutAction = () => (dispatch) => {
    dispatch({
        type: 'logout_user'
    })
    localStorage.removeItem('user')
}
 