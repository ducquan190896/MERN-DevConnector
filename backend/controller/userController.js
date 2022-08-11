import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Asynchandler from 'express-async-handler'
import Post from '../models/postModel.js'
import Profile from '../models/profileModel.js'

const generateToken = (userid) => {
    const token = jwt.sign({_id: userid}, process.env.private_key, {expiresIn: '1h'})
    return token
}

export const Register = Asynchandler(async (req, res) => {
    // console.log(req.body)
    let user = await User.findOne({email: req.body.email})
    // console.log(user)
    if(user) {
        res.status(404)
        throw new Error('user exists, cannot register')
    }
    user = await User.create({...req.body})
    if(!user) {
        res.status(404)
        throw new Error('user cannot be created')
    }
    const obj = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar, 
        token: generateToken(user._id)
    }
    res.status(200).json({
       ...obj
    })
   
})


export const Login = Asynchandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }
    const isCorrect = await user.verifypassword(password)
    if(!isCorrect) {
        res.status(404)
        throw new Error('your password not correct')
    }
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id)
    })
})

export const Updateuser = Asynchandler(async (req, res) => {
   
    let user = await User.findById(req.user._id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }
    
    const updateduser = await User.findByIdAndUpdate(user._id, req.body, {new: true})
    if(!updateduser) {
        res.status(404)
        throw new Error('user cannot be updated')
    }


    res.status(200).json({
        _id: updateduser._id,
        name: updateduser.name,
        email: updateduser.email,
        avatar: updateduser.avatar,
        token: generateToken(updateduser._id)
    })
})

export const DeleteUser = Asynchandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if(!user) {
        res.status(404)
        throw new Error('user not found')
    }
    await Post.deleteMany({user: user._id})
    await Profile.findOneAndRemove({user: user._id}) 
    await user.remove()
    res.status(200).json({message: 'user, profile, and all posts are deleted successfully'})

})

