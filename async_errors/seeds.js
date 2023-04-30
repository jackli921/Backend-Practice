
const mongoose = require("mongoose")
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand2")
  .then(() => {
    console.log("Mongo Connection OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO Mongo connection ERROR!!!");
    console.log(err);
  });


//   const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: "Fruit"
//   })

//   p.save()
//     .then(p=>{
//     console.log(p)
//   })
//     .catch(err=>{
//         console.log(err)
//     })

const seedProducts = [
  {
    name: "eggplant",
    price: 1.0,
    category: "veggie",
  },
  {
    name: "melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "tomatoes",
    price: 2.99,
    category: "veggie",
  },
  {
    name: "celery",
    price: 1.5,
    category: "veggie",
  },
  {
    name: "milk",
    price: 3.0,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(err => console.log(err))