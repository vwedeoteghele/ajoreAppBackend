const mongoose = require('mongoose')

const ajoreSchema = new mongoose.Schema({
  ajoreName: {
    type: String,
    required: true
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
}
},
{
  timestamps: true,
})

module.exports = mongoose.model("ajore", ajoreSchema)