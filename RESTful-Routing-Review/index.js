const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
// const vansData = require('./data')
app.use(express.urlencoded({ extended: true })); //run on every single request since it's default root is ./
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let vansData = [
  {
    id: "1",
    name: "Modest Explorer",
    price: 60,
    description:
      "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png",
    type: "simple",
    hostId: "123",
  },

  {
    id: "2",
    name: "Beach Bum",
    price: 80,
    description:
      "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png",
    type: "rugged",
    hostId: "123",
  },
  {
    id: "3",
    name: "Reliable Red",
    price: 100,
    description:
      "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
    type: "luxury",
    hostId: "456",
  },
  {
    id: "4",
    name: "Dreamfinder",
    price: 65,
    description:
      "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
    type: "simple",
    hostId: "789",
  },
  {
    id: "5",
    name: "The Cruiser",
    price: 120,
    description:
      "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
    type: "luxury",
    hostId: "789",
  },
  {
    id: "6",
    name: "Green Wonder",
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
    imageUrl:
      "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
    type: "rugged",
    hostId: "123",
  },
];


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


//create a form for edits
app.get('/vans/:id/edit', (req,res)=>{
    const { id } = req.params;
    const van = vansData.find((van) => van.id === id);
    res.render('edit', {van})
})

// edit route - updating existing entries
app.patch('/vans/:id', (req,res)=>{
  const { id } = req.params;
  const updatedVan = req.body
   
  vansData = vansData.map(van=> {
    if(van.id === id){
        return updatedVan;
    }
    else{
        return van;
    }
  })
  res.redirect('/vans')
})

//deleting an entry

app.delete('/vans/:id', (req,res)=>{
    const { id } = req.params
    vansData = vansData.filter(van => van.id !== id)
    res.redirect('/vans')
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



