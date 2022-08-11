import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
    
})

const  checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype) {
        return cb(null, true)
    } else {
        return cb('error: image only')
    }
  } 

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})


router.post('/', upload.single('image'), (req, res) => {
    res.status(200).send(`${req.file.filename}`)
    // res.status(200).send(`${req.file.path}`)
})

export default router
