const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
 
  verified: {
    type: Boolean,
    default: false
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('company', companySchema)