import express from 'express'

import { DeleteUser, Login, Register, Updateuser } from '../controller/userController.js'
import { protectionRoute } from '../middleware/Protectionroute.js'

const router = express.Router()

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/updateuser').put( protectionRoute ,Updateuser)
router.route('/deleteuser').delete(protectionRoute, DeleteUser)
export default router