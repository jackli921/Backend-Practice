const express = require('express')
const app = express()

// app.use((req, res)=>{
//     console.log("Here's the cheeseburger")
//     res.send("<h1>Hello, we got your request! Here is your cheeseburger!</h1>")
// })

app.get('/', (req, res)=>{
    res.send("Welcome to the homepage")
})

app.get("/r/:subreddit/:postId", (req, res)=>{
    const {subreddit, postId} = req.params
    res.send(`viewing ${subreddit}! subreddit with postId: ${postId}`)
})

app.get('/search', (req, res)=>{
    const { q, color } = req.query
    console.log(q, color)
    if(!q){
        res.send("Nothing found if nothing searched")
    }
    res.send(`<h1>Search results for: ${q}`)
})

app.use("/cats", (req, res) =>{ 
    res.send("MEOW!!!")
})

app.get("/dogs", (req, res) => {
    res.send("WOOOF!!!")
})

app.post('/cats', (req, res)=>{
    res.send("POst request send to /cats!! This is different from a GET request")
})

app.listen(3000, ()=> {
    console.log("Listening on port 3000!")
})

app.get("*", (req,res)=>{
    res.send("404!")
})