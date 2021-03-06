const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const Form = require("./database.js")
const RegisterDetails = require("./registrationDetails.js")
mongoose.connect("mongodb://localhost:27017/namrata", { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())

const secretKey = "secretkey"
// const password = "abc"
// const email = "nami"
//* ************* Registration and login***************************/

// Midlle ware for hashing password

const hashWare = function (req, res, next) {
  const { password } = req.body
  const saltRounds = 10
  console.log(password)
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (hash) {
      req.body.password = hash
      console.log(password)

      next()
    } else {
      throw new Error("Could not register. Try again later")
    }

  })
}

// Registration

app.post("/form/register", hashWare, (req, res) => {
  const registerdetails = new RegisterDetails(req.body)
  registerdetails
    .save()
    .then(data => res.status(200).send(`Congrats! Welcome${data.name}`))
    .catch(err => res.status(500).send("Sorry! Could not register ! Try again later!!"))
})

// login

app.post("/form/login", (req, res) => {
  const { username } = req.body
  RegisterDetails
    .findOne({ username })
    .exec()
    .then((data) => {
      if (!data) throw new Error("No such user")

      const { password } = data
      return bcrypt.compare(req.body.password, password)
    })
    .then((result) => {
      console.log(result)
      if (result) {
        jwt.sign({
          email: username,
          expiresIn: "1 h"
        },
        secretKey,
        (err, token) => {
          if (err) res.status(500).send(err.message)
          if (token) res.send(token)
        })
      } else {
        res.send("Not a valid user!") // wrong login credentials
      }
    })
    .catch(err => console.log(err))
    .catch(err => res.status(403).send(err.message))

})

// Middleware for verfication of token

const verifyWare = function (req, res, next) {
  const token = req.headers.authorization
  const decoded = jwt.verify(token, secretKey)
  console.log(decoded)
  if (decoded) {
    next()
  } else {
    res.status(400).send("Not a valid user!")
  }
}

// **********************CRUD OPERATIONS******************************//

// This middleware will be used in all subsequent api calls

app.use(verifyWare)

// For saving the data in the database(create/save)//
app.post("/form/savedata", (req, res) => {
  const form = new Form(req.body)
  form
    .save()
    .then(formDetails => res.send(formDetails))
    .catch(err => res.status(500).send(err.message))
})

// For finding data using _id(findOne)//

app.get("/form/:id", (req, res) => {
  const _id = req.params.id
  Form
    .findOne({ _id })
    .exec()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err.message))
})
// For finding all the data(find)//

app.get("/forms", (req, res) => {
  Form
    .find()
    .exec()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err.message))
})
// For updating data(update)//

app.put("/form/:id", (req, res) => {
  const _id = req.params.id
  Form
    .findOne({ _id })
    .exec()
    .then((form) => {
      if (form === null) throw new Error("No Such Form")
      form.name = req.body.changedName
      return form.save()
    })
    .then(data => res.send(`Name chaged to ${data.name}`))
    .catch(err => res.status(500).send(err.message))
})

// For deleting data(delete)//

app.delete("/form/:id", (req, res) => {
  const _id = req.params.id
  Form.deleteOne({ _id })
    .then(() => res.send("OK"))
    .catch(err => res.status(500).send(err.message))
})

app.listen(8000, () => console.log("Example app listening on port 8000!"))

function newFunction() {
  return "./registrationDetails.js";
}
