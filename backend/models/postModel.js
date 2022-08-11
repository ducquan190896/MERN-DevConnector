import mongoose from 'mongoose'
import User from './userModel.js'

const commentschema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })

const postschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        }
      ],
      unlikes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        }
      ],
      comments: [
        commentschema
      ]
}, {
    timestamps: true
})


const Post = mongoose.model('Post', postschema)

export default Post