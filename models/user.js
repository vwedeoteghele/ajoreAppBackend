const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  companyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company"
  },
  role: {
    type: String,
    enum: ['admin', 'regular'],
    default: 'regular'
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model("user", userSchema)