const mongoose = require('mongoose')
const validator = require('validator')

const noteSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
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
