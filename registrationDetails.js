const mongoose = require("mongoose")
const RegisterSchema = mongoose.Schema({
  username: String,
  name: String,
  phone: String,
  password: String
})

const RegisterDetails = mongoose.model("RegisterDetails", RegisterSchema)

module.exports = RegisterDetails
