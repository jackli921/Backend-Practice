const express = require('express')
const app = express()


app.get('/tacos', (req, res)=>{
    res.send("GET /tacos responses")
})

app.post('/tacos', (req, res)=>{
    res.send("POST /tacos response")
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})