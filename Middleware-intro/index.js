const express = require('express')
const app = express()
const morgan = require('morgan')


app.use(morgan("tiny"));

app.use('/dogs', (req,res,next)=>{
    req.requestTime = new Date();
    next()
})

const verifyPassword = ((req, res, next)=>{
    const {password }= req.query
    if (password === "123"){
        next();
    }
    res.send("YOU NEED A PASSWORD")
})

app.get('/', (req,res)=>{
    res.send("HOMEPAGE")
})

app.get('/secret', verifyPassword, (req, res)=>{
    res.send("Sometimes I don't like apples")
})
app.get('/dogs', (req,res)=>{
    console.log(req.requestTime)
    res.send("WOOFWOOF")
})


app.use((req,res)=>{
    res.status(404).send('NOT FOUND')
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})