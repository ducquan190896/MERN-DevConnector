import Profile from '../models/profileModel.js'
import Asynchandler from 'express-async-handler'
import normalize from 'normalize-url'

export const Createprofile =  Asynchandler(async (req, res) => {
    console.log(req.user._id)
    let profile = await Profile.findOne({user: req.user._id})
    if(profile) {
        res.status.apply(404)
        throw new Error('profile exists, cannot created')
    } 
    let {location, status, skills} = req.body
    const youtube = req.body.youtube || null
    const twitter = req.body.twitter || null
    const facebook = req.body.facebook || null
    const instagram = req.body.instagram || null
    const linkedin = req.body.linkedin || null
    skills = skills.split(',')
    let socialfield = {youtube, twitter, facebook, instagram, linkedin}
    let social = {}

    for (let [key, value]  of Object.entries(socialfield)) {
        if(value && value.length > 0) {
            social[key] = normalize(value, {forceHttp: true})   
        }
    }
    const user = req.user._id
    profile = await Profile.create({
        user,
        location, 
        status, 
        skills,
        social
    })

    if(!profile) {
        res.status(404)
        throw new Error('profile cannot be created')
    }
    console.log(profile)
    res.status(200).json(profile)

   
}) 
export const Updateprofile =  Asynchandler(async (req, res) => {
    let profile = await Profile.findOne({user: req.user._id})
    if(!profile) {
        res.status(404)
        throw new Error('profile not found')
    } 
    let {location, status, skills} = req.body
    skills = skills.split(',')

    const youtube = req.body.youtube || null
    const twitter = req.body.twitter || null
    const facebook = req.body.facebook || null
    const instagram = req.body.instagram || null
    const linkedin = req.body.linkedin || null
   
    let socialfield = {youtube, twitter, facebook, instagram, linkedin}
    let social = {}

    for (let [key, value]  of Object.entries(socialfield)) {
        if(value && value.length > 0) {
            social[key] = normalize(value, {forceHttp: true})   
        }
    }
    const obj = {location, status, skills, social}
    console.log(obj)
    profile = await Profile.findOneAndUpdate({user: req.user._id}, obj, {new: true})
    
    if(!profile) {
        res.status(404)
        throw new Error('profile cannot be created')
    }
    res.status(200).json(profile)

   
}) 

export const getpostbycurrentuser = Asynchandler(async(req, res) => {
    const profile = await Profile.findOne({user: req.user._id}).populate('user', 'name email avatar')
    if(!profile) {
        res.status(400)
        throw new Error('profile not found')
    }

    res.status(200).json(profile)
})

export const getsingleprofile = Asynchandler(async(req, res) => {
    const profile = await Profile.findOne({user: req.params.userid}).populate('user', 'name email avatar')
    if(!profile) {
        res.status(400)
        throw new Error('profile not found')
    }

    res.status(200).json(profile)
})
export const getAllProfiles = Asynchandler(async (req, res) => {
    const profiles = await Profile.find({}).populate('user', 'name email avatar')
    if(!profiles)  {
        res.status(400)
        throw new Error('no profiles found ')

    }
    res.status(200).json(profiles)
})

export const createExperience = Asynchandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    if(!profile) {
        res.status(400)
        throw new Error('profile not Found')
    }
    const {title, company, location, from, to, current, description} = req.body
    const experience1 = {}
    experience1.current = current ? current : false
    experience1.title = title ? title : ''
    experience1.company = company ? company : ''
    experience1.location = location ? location : ''
    experience1.from = from ? from : ''
    experience1.to = to ? to : ''
    experience1.description = description ? description : ''
  
    profile.experience.push(experience1)
    await profile.save()
    if(!profile) {
        res.status(400)
        throw new Error('experience cannot be created')
    }
    res.status(200).json(profile)

})

export const deleteExperience = Asynchandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    if(!profile) {
        res.status(400)
        throw new Error('profile not found')
    }
    const experienceid = req.params.experienceid
    console.log(experienceid)
    const findexperience = profile.experience.find(ex => ex._id.toString() === experienceid.toString())
    if(!findexperience) {
        res.status(400)
        throw new Error('experience not found')
    }
    profile.experience = profile.experience.filter(ex => ex._id.toString() !== experienceid.toString())
    await profile.save()
    if(!profile) {
        res.status(400)
        throw new Error('profile cannot be created')
    }
    res.status(200).json(profile)

})


export const createeducation = Asynchandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    if(!profile) {
        res.status(400)
        throw new Error('profile not found')
    }
    const {school, degree, fieldofstudy, from, to, current, description} = req.body
    const education1 = {
        school,
        degree,
        fieldofstudy,
        from,
        to: to ? to : '',
        current: current ? current : false,
        description: description ? description : ''
    }
    
    profile.education.push(education1)
    await profile.save()

    res.status(200).json(profile)
})

export const deleteeducation = Asynchandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    if(!profile) {
        res.status(400)
        throw new Error('profile not found')
    }
    const educationid = req.params.educationid
    console.log(educationid)
    const findeducation = profile.education.find(ed => ed._id.toString() === educationid.toString())
    if(!findeducation) {
        res.status(400)
        throw new Error('education not found')
    }
    profile.education = profile.education.filter(ed => ed._id.toString() !== educationid.toString())
    await profile.save()
    if(!profile) {
        res.status(400)
        throw new Error('profile cannot be created')
    }
    res.status(200).json(profile)

})