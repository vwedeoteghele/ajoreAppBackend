const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
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
  password: String,
  companyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company"
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department"
},
ajore: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ajore"
  }
],
  password: {
    type: String
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model("employee", employeeSchema)