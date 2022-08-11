import User from '../models/userModel.js'
import Profile from '../models/profileModel.js'
import Post from '../models/postModel.js'
import Asynchandler from 'express-async-handler'

export const CreatePost = Asynchandler(async (req, res) => {
    const {text} = req.body

    const post = await Post.create({
        text,
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar

    })
    if(!post) {
        res.status(404)
        throw new Error('post not created')
    }
    res.status(200).json(post)
})
export const DeletePost = Asynchandler(async (req, res) => {
    const {postid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(404)
        throw new Error('post not found')
    }
    if(post.user.toString() !== req.user._id.toString()) {
        res.status(404)
        throw  new Error('not authorized to delete post')
    }
    await post.remove()
    res.status(200).json({message: 'post deleted successfully'})
})

export const GetSinglePost = Asynchandler(async (req, res) => {
    const {postid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(404)
        throw new Error('post not found')
    }
   
    res.status(200).json(post)
})
export const GetAllPost = Asynchandler(async (req, res) => {
   
    const posts = await Post.find({}).sort({updatedAt: -1})
    if(!posts) {
        res.status(404)
        throw new Error('posts not found')
    }
   
    res.status(200).json(posts)
})
export const LikePost = Asynchandler(async (req, res) => {
    const {postid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(404)
        throw new Error('post not found')
    }
    const findlike = post.likes.find(like => like.user.toString() === req.user._id.toString())
    if(findlike) {
        res.status(404) 
        throw new Error('just allowed to like one time')
    }
    post.unlikes = post.unlikes.filter(unlike => unlike.user.toString() !== req.user._id.toString())
    post.likes.push({user: req.user._id})
    await post.save()
    res.status(200).json(post)
})
export const unLikePost = Asynchandler(async (req, res) => {
    const {postid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(404)
        throw new Error('post not found')
    }
    const findUnlike = post.unlikes.find(like => like.user.toString() === req.user._id.toString())
    if(findUnlike) {
        res.status(404) 
        throw new Error('just allowed to unlike one time')
    }
    post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString())
    post.unlikes.push({user: req.user._id})
    await post.save()
    res.status(200).json(post)
})

export const createComment = Asynchandler(async (req, res) => {
    const {postid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(400)
        throw new Error('post not found')
    }
    const {text} = req.body
    const commentObj = {
        text,
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar
    }
    post.comments.unshift(commentObj)
    await post.save()
    res.status(200).json(post)
})

export const Deletecomment = Asynchandler(async (req, res) => {
    const {postid, commentid} = req.params
    const post = await Post.findById(postid)
    if(!post) {
        res.status(400)
        throw new Error('post not found')
    }

    const findcomment = post.comments.find(comment => comment._id.toString() === commentid.toString())
    if(!findcomment) {
        res.status(404)
        throw new Error('comment not found')
    }
    if(findcomment.user.toString() !== req.user._id.toString()) {
        res.status(404)
        throw new Error('not authorized to delete comment')
    }
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentid.toString())
    await post.save()
    res.status(200).json({message: 'comment deleted successfully'})

})

