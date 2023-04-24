const express = require("express")
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product');
const { resolveSoa } = require("dns");

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
app.set('view engine', 'ejs')

app.use (express.urlencoded({extended: true}))

// make a form to submit new product
app.get('/products/new', (req,res)=>{
    res.render('products/new')
})

// saving new product to database and redirect to new product details
app.post('/products', async (req, res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit', async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product})
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
