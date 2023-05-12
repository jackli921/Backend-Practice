const express = require('express')
const app = express()
const ramenRoutes = require('./Routes/ramen')
const tokyoRoutes = require('./Routes/tokyoRoutes')
const adminRoutes = require('./Routes/admin')
const cookieParser = require('cookie-parser')

app.use(cookieParser('thisismysecret'))
app.use("/fukuoka/ramen", ramenRoutes);
app.use("/tokyo/cafe", tokyoRoutes )
app.use("/admin", adminRoutes)


app.get('/greet', (req, res)=>{
    const {name, me, I} = req.cookies
    res.send(`Hey There, ${name} ${me} ${I}`)
})

app.get('/setname', (req, res)=>{
    res.cookie('name', 'Jake')
    res.cookie('me', 'Hi')
    res.cookie('I', 'Me')
    res.send("Gave you a cookie")
})

app.get('/getsignedcookies', (req, res)=>{
    res.cookie("gender", "male", { signed: true });
    res.send("Signed it")
})

app.get('/verify', (req,res)=>{
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3030, (req,res)=>{
    console.log('listening on port 3030')
})