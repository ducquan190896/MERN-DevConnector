import express from 'express'
const router = express.Router()
import {createComment, CreatePost, Deletecomment, DeletePost, GetAllPost, GetSinglePost, LikePost, unLikePost} from '../controller/postController.js'
import {protectionRoute} from '../middleware/Protectionroute.js'

router.route('/createpost').post(protectionRoute, CreatePost)
router.route('/getAllpost').get(protectionRoute, GetAllPost)
router.route('/singlepost/:postid').get(protectionRoute, GetSinglePost)
router.route('/likepost/:postid').put(protectionRoute, LikePost)
router.route('/unlikepost/:postid').put(protectionRoute, unLikePost)
router.route('/deletepost/:postid').delete(protectionRoute, DeletePost)
router.route('/:postid/createcomment').put(protectionRoute, createComment)
router.route('/:postid/comment/:commentid').delete(protectionRoute, Deletecomment)

export default router