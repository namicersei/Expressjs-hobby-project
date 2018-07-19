const mongoose = require("mongoose")

const FormSchema = new mongoose.Schema({
  name: String,
  age: Number,
  placeOfBirth: String,
})

const Form = mongoose.model("Form", FormSchema)

module.exports = Form
