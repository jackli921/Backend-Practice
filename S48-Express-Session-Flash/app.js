const express = require('express')
const app = express()
const session = require('express-session')


const sessionOptions = { secret: "thisisnotagoodsecret", resave: false, saveUninitialized: false};
app.use(session(sessionOptions))


app.get('/viewcount', (req,res)=>{
    req.session.count ? req.session.count +=1 : req.session.count = 1
    res.send(`you have view the page ${req.session.count}`)
})

app.get('/register', (req, res)=>{
    const {username = "Anonymous"} = req.query
    req.session.username = username
    res.redirect('/greet');
})

app.get('/greet', (req,res)=>{
    const {username} = req.session
    res.send(`welcome back, ${username}`)
})

app.listen(3030, (req,res)=>{
    console.log("Listening")
})