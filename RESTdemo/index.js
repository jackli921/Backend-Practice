const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({ extended: true })) //running some code on every single request, doesn't matter the request or path
app.use(express.json())

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')


const comments = [
    {
        username:"Tod",
        comment: "lol, that's so funny"
    },
    {
        username:"Dog",
        comment: "troll!!"
    },
    {
        username:"Ted",
        comment: "plz delete your account, Todd"
    },
    {
        username:"Ken",
        comment: "Wow that's so cute"
    }
]
// view all comments
app.get('/comments', (req, res)=>{
    res.render('comments/index', {comments})
})

// create new comment

// just serves a form & renders a form
app.get("/comments/new", (req , res)=>{
    res.render('comments/new')  
})

// where the form submits and extract the data from the form
app.post("/comments", (req, res)=>{
    const {username, comment} = req.body
    comments.push({username, comment})
    res.send("IT WORKED")
})



app.get('/tacos', (req, res)=>{
    res.send("GET /tacos responses")
})

app.post('/tacos', (req, res)=>{
    const {meat , qty} = (req.body)
    console.log(req.body)
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})
