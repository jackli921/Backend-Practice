const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const app = express()

const tokyoRoutes = require('./Routes/tokyoRoutes')
const adminRoutes = require('./Routes/admin')

app.use(cookieParser('supersecretkey'))

app.use('/cafes', tokyoRoutes)
app.use('/admin', adminRoutes)


app.get('/greet', (req,res)=>{
    const {name = "Jack"} = req.cookies
    res.send(`Hey there, ${name}`);
})

app.get('/setname', (req,res)=>{
    res.cookie('name', 'Alex')
    res.send("Sent you a cookie")
})

app.get('/getsignedcookie', (req,res)=>{
    res.cookie('fruit', 'grape', {signed: true})
    res.send('Here is your signed cookie')
})

app.get('/verifyfruit', (req,res)=>{
    console.log(req.cookie)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3030, (req,res)=>{
    console.log('listening on port 3030')
})