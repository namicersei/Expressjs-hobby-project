const express = require('express')
const app = express();

app.get('/hello/:name?', (req, res) => {
    let who
    if (req.params.name === undefined) {
        who = "World"
    } else {
        who = req.params.name
    }
    return res.send("Hello, " + who)
})
// app.get('/time', (req, res) => {
//     var d = new Date();
//     var n = d.getTime();
//     console.log(n);
//     res.status(200).send(String(n))
    
// })
app.listen(process.argv[2], () => console.log('Example app listening on port 3000!'))

