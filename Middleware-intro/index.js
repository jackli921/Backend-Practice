const express = require('express')
const app = express()
const morgan = require('morgan')
const AppError = require('./AppError')

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
    throw new AppError("Password required", 401)
})

app.get('/', (req,res)=>{
    res.send("HOMEPAGE")
})

app.get('/secret', verifyPassword, (req, res)=>{
    res.send("Sometimes I don't like apples")
})

app.get('/admin', (req, res)=>{
    throw new AppError('You are not an admin', 403)
})


app.get('/error', (req,res)=>{
    chicken.fly()
})

app.get('/dogs', (req,res)=>{
    console.log(req.requestTime)
    res.send("WOOFWOOF")
})


app.use((req,res)=>{
    res.status(404).send('NOT FOUND')
})

app.use((err, req, res, next)=>{
    const {status = 500, message = "Something went wrong"} = err
    res.status(status).send(message)

})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})