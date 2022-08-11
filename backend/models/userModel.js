import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    avatar: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userchema.methods.verifypassword = async function(inputpassword) {
    const isCorrect = await bcrypt.compare(inputpassword, this.password)
    return isCorrect
}

userchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userchema)



export default User