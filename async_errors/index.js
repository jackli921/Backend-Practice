const express = require("express")
const app = express();
const path = require('path')
const methodOverride = require("method-override");
const mongoose = require('mongoose')
const Product = require('./models/product');
const { resolveSoa } = require("dns");
const AppError = require("./AppError");


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
// make a form to submit new product
app.get('/products/new', (req,res)=>{
    res.render('products/new', {categories})
})

// saving new product to database and redirect to new product details
app.post('/products', async (req, res, next)=>{
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)
    }
    catch(e){
        next(e)
    }
})

// get the id to display the form so user can edit
app.get('/products/:id/edit', async (req,res, next)=>{

    try{
        const { id } = req.params;
        const product = await Product.findById(id)        
        res.render('products/edit', {product, categories})
    }
    catch(e){
         return next(new AppError("Product Not Found", 404));
    }

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
app.get('/products/:id', async (req, res, next)=>{

    try{
        const {id}= req.params;
        const product = await Product.findById(id)
            res.render('products/show', {product})
    }
    catch(e){
        return next(new AppError("NOT FOUND", 404));
    }

})

// deleting a product
http: app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
});


app.use((err, req, res, next)=>{
    const {status = 500, message = "Something went wrong"} = err;
    res.status(status).send(message)
})

// listening 
app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})
