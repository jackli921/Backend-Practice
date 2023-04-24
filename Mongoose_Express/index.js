const express = require("express")
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')

// use mongoose to use mongodb
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log("Mongo Connection OPEN!!!")
    })
    .catch(err=>{
        console.log("OH NO Mongo connection ERROR!!!")
        console.log(err)
    })

// set the path for the directory where your application's views are stored
app.set('views', path.join(__dirname, 'views'))

// set the view engine that will be used to render the views
app.set('view engine', 'ejs')

// make a form to submit new product
app.get('/products/new', (req,res)=>{
    res.render('products/new')
})


// show all products
app.get('/products', async (req,res)=>{
    const products = await Product.find({})
    res.render('products/index', {products})
})


// show details of one product 
app.get('/products/:id', async (req, res)=>{
    const {id}= req.params;
    const product = await Product.findById(id)
    res.render('products/show', {product})
})


// listening 
app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})

