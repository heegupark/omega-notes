const mongoose = require('mongoose')
const validator = require('validator')

const noteSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  imgUrl: {
    type: String,
    required: false,
    trim: true
  },
  thumbnailImgUrl: {
    type: String,
    required: false,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
