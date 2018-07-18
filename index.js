const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Form = require('./database.js');

mongoose.connect('mongodb://localhost:27017/namrata', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());


app.post('/', (req, res) => {
    
    const formDetails = new Form(req.body);  
    formDetails
    .save(function(err, formDetails) {
    if (err) {
    console.log(err)
    return res.status(404)
    }
    else {
    console.log(formDetails);
    return res.send(formDetails);
    }
    })
})

app.get('/', (req, res) => {
  Form
  .find({name: "nami"})
  .exec()
  .then((data) => {
    return res.send(data)
  })
  .catch ((err) => {
    console.log(err);
    return res.status(400).send(err.message);
  })
})
app.listen(8000, () => console.log('Example app listening on port 3000!'))

