const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
},
},
{
  timestamps: true,
})

module.exports = mongoose.model("department", departmentSchema)