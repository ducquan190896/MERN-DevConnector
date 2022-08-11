import express from 'express'
const router = express.Router()
import { protectionRoute } from '../middleware/Protectionroute.js'
import { createeducation, createExperience, Createprofile, deleteeducation, deleteExperience, getAllProfiles, getpostbycurrentuser, getsingleprofile, Updateprofile } from '../controller/profileController.js'

router.route('/createprofile').post( protectionRoute ,Createprofile)
router.route('/updateprofile').put( protectionRoute , Updateprofile)
router.route('/getcurrentprofile').get(protectionRoute, getpostbycurrentuser)
router.route('/getsingleprofile/:userid').get(getsingleprofile)
router.route('/getallprofiles').get(getAllProfiles)
router.route('/createexperience').post(protectionRoute, createExperience)
router.route('/deleteexperience/:experienceid').put(protectionRoute, deleteExperience)
router.route('/createeducation').post(protectionRoute, createeducation)
router.route('/deleteeducation/:educationid').put(protectionRoute, deleteeducation)


export default router