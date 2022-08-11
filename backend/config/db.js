import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`mongoose connected ${coon.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB