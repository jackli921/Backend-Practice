const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true })) //running some code on every single request, doesn't matter the request or path
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


const comments = [
    {
        username:"Cat",
        comment: "Meow meow meow",
        id:uuidv4()
    },
    {
        username:"Dog",
        comment: "WOOF WOOF WOOF",
        id:uuidv4()
    },
    {
        username:"Chicken",
        comment: "cock-a-doodle-doo",
        id:uuidv4()
    },
    {
        username:"Cow",
        comment: "Moooooo",
        id:uuidv4()
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
    comments.push({username, comment, id: uuidv4()})
    res.redirect('/comments')
})

// show individual comment
app.get('/comments/:id', (req,res)=>{
    const {id} = req.params
    const comment = comments.find(post => post.id === id )
    res.render('comments/show', { comment })
})

// finds comment with specified id and pass it ot view
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params
    const comment = comments.find(comment => comment.id === id)
    res.render('comments/edit', {comment})
})

// updating comments
app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params
    const newComment = req.body.comment
    const foundComment = comments.find(post => post.id === id)
    foundComment.comment = newComment
    res.redirect("/comments")
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})