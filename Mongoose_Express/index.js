const express = require("express")
const app = express();
const path = require('path')
const methodOverride = require("method-override");
const mongoose = require('mongoose')
const Product = require('./models/product');
const { resolveSoa } = require("dns");
const Farm = require('./models/farm')


// use mongoose to use mongodb
mongoose.connect('mongodb://localhost:27017/farmStand2')
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
app.use(methodOverride('_method'))
const categories = ["fruit", "veggie", "dairy", "mushrooms", "bread"];
// farm routes

app.get('/farms', async(req, res)=>{
    const farms = await Farm.find({})
    res.render('farms/index', {farms})
})

app.get('/farms/new', (req,res)=>{
    res.render('farms/new')
})

app.get('/farms/:id', async (req,res)=>{
    const farm = await Farm.findById(req.params.id).populate('products')
    console.log(farm)
    res.render('farms/show', {farm})
})

app.post('/farms', async (req,res)=>{
    const farm = new Farm(req.body)
    await farm.save()
    res.redirect('/farms')
})

app.get('/farms/:id/products/new', async (req, res)=>{
    const {id} = req.params
    const farm = await Farm.findById(id) 
    res.render('products/new', {categories, farm})
})

app.post('/farms/:id/products', async (req,res)=>{
    const {id} = req.params
    const farm = await Farm.findById(id)

    const {name, price, category} = req.body
    const product = new Product({ name, price, category });
    farm.products.push(product)
    product.farm = farm
    await farm.save()
    await product.save()
    res.redirect(`/farms/${id}`)

})

app.delete('/farms/:id', async(req,res)=>{
    const farm = await Farm.findByIdAndDelete(req.params.id)
    res.redirect('/farms')
})

// product routes


// make a form to submit new product
app.get('/products/new', (req,res)=>{
    res.render('products/new', {categories})
})

// saving new product to database and redirect to new product details
app.post('/products', async (req, res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

// get the id to display the form so user can edit
app.get('/products/:id/edit', async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
})
// get the data of the product to be edited and update the product in db
app.put('/products/:id', async (req,res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})


// show all products
app.get('/products', async (req,res)=>{
    const { category } = req.query;

    if(category){
        const products = await Product.find({category})
        res.render("products/index", {products, category});
    }
    else {
        const products = await Product.find({})
        res.render('products/index', {products, category: "All"})
    }
})

// show details of one product 
app.get('/products/:id', async (req, res)=>{
    const {id}= req.params;
    const product = await Product.findById(id).populate('farm','name')
    console.log(product)
    res.render('products/show', {product})
})

// deleting a product
http: app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')

});

// listening 
app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})

// sorting by categories