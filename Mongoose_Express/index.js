const express = require("express")
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log("Mongo Connection OPEN!!!")
    })
    .catch(err=>{
        console.log("OH NO Mongo connection ERROR!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/products', async (req,res)=>{
    const products = await Product.find({})
    console.log(products)
    res.send("All products will be here ")
})


app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})

