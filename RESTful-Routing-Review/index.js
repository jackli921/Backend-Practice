const express = require('express')
const app = express()
const path = require('path')

const vansData = require('./data')

app.use(express.urlencoded({ extended: true })) //run on every single request since it's default root is ./
app.use(express.json())
app.set('views', path.join(__dirname,'views'))
app.set('view engine', "ejs")
// GET /vans - list all vans
// POST /vans  - create a new vans
// GET /vans/:id - get one vans using ID
// PATCH /vans/:id - edit one vans using ID
// DELETE /vans/:id - delete one vans using ID


app.get('/vans', (req ,res)=>{
    res.render('index', {vansData})
})

// create a form for user to create a new item
app.get('/vans/new', (req, res)=>{
    res.render('new')
})

// create a POST response to create a new entry
app.post('/vans', (req, res)=>{
    const {name, type, price, description} = req.body
    vansData.unshift({
        name,
        type,
        price,
        description
    })
    res.redirect("/vans")
})

// detail route - showing a specific entry  
app.get('/vans/:id', (req,res)=>{
    const {id} = req.params
    const van = vansData.find(van=> van.id === id)
    res.render('vanDetails', {van})
})




app.get('/tacos',(req ,res)=>{
    res.send("Here is a GET response")
})

app.post('/tacos', (req ,res)=>{
    const {type, qty} = req.body;
    res.send(`OK. You get ${qty} ${type} tacos!`)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})

