import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({path: './backend/config/config.env'})
connectDB()
const app = express()
app.use(express.json())
app.use(cors())


import userRouter from './routes/userRoute.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import uploadRoute from './routes/imageuploadRoute.js'
import profilerouter from './routes/profileRoute.js'
import postRoute from './routes/postRoute.js'

app.get('/',  (req, res) => {
        res.status(200).json({message: 'welcome to devconnector app'})
})

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/backend/uploads')))
// app.use('backend/uploads', express.static(path.join(__dirname, '/backend/uploads')))
app.use('/api/upload', uploadRoute)

app.use('/api/user', userRouter)
app.use('/api/profile', profilerouter)
app.use('/api/post', postRoute)

app.use(notFound)
app.use(errorHandler)


const PORT = 5000 || process.env.PORT 

 app.listen(PORT, () => console.log(`app is running on PORT ${PORT}`))





