
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protectionRoute = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        console.log(token)        
    }
    if(!token) {
        res.status(400)
        throw  new Error('token not found')
    }
    const decode = jwt.verify(token, process.env.private_key)
    if(!decode) {
        res.status(400)
        throw new Error('token is not correct')
    }
    const _id = decode._id
    const user = await User.findById(_id).select('-password')
    if(!user) {
        res.status(404)
        throw new Error('user not found')
    }
    req.user = {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id
    }
    console.log(req.user)
    next()
}