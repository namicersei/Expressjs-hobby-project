const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const Form = require("./database.js")

mongoose.connect("mongodb://localhost:27017/namrata", { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())

// CRUD OPERATIONS//****/
// For saving the data in the database(create/save)//
// app.post("/", (req, res) => {
//   const form = new Form(req.body)
//   form
//     .save((err, formDetails) => {
//       if (err) {
//         console.log(err)
//         return res.status(404)
//       }
//       console.log(formDetails)
//       return res.send(formDetails)
//     })
// })

// For finding data using _id(findOne)//
app.get("/forms/:id", (req, res) => {
  const _id = req.params.id
  Form
    .findOne({ _id })
    .exec()
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message))
})
// For finding all the data(find)//
app.get("/forms", (req, res) => {
  Form
    .find()
    .exec()
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message))
})
// For updating data(update)//

app.put("/forms/:id", (req, res) => {
  const _id = req.params.id
  Form
    .findOne({ _id })
    .exec()
    .then((form) => {
      if (form === null) throw new Error("No Such Form")
      form.name = "rakhi"
      return form.save()
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err.message))
})

// For deleting data(delete)//
app.delete("/forms/:id", (req, res) => {
  const _id = req.params.id
  Form.deleteOne({ _id }, (err) => {
    res.status(400).send(err.message)
  })


})

app.listen(8000, () => console.log("Example app listening on port 3000!"))
