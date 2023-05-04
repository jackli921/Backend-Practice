const mongoose = require("mongoose");
const {Schema }= mongoose

mongoose
  .connect("mongodb://localhost:27017/relationshipDB")
  .then(() => {
    console.log("MongoDB Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error!", err);
  });


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})


const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId , ref: 'Product' }]
})


// make a model

const Product = mongoose.model('Product', productSchema)
const Farm = mongoose.model('Farm', farmSchema)


// const makeFarm = async ()=>{
//     const farm = new Farm({
//         name: "Full Belly Farm",
//         city: "Guinda, CA"
//     })

//     const orange = await Product.findOne({name: ' Sunshine Orange'})
//     farm.products.push(orange)
//     await farm.save()
// }

// makeFarm()


const addProduct = async () =>{
    const farm = await Farm.findOne({name: 'Full Belly Farm'})
    const grape = await Product.findOne({name: ' Sugar grapes'})

    farm.products.push(grape)
    await farm.save()
    console.log(farm)
}

addProduct()

// const result = async () => {
//   try {
//     await Product.deleteOne({ _id: "6453cd5b4187ab59e87fe9e8" });
//   } catch (err) {
//     console.log(err);
//   }
// };


// Product.insertMany([
//     {name: ' Goddness Melon', price: 4.99, season: "Summer"},
//     {name: ' Sugar grapes', price: 3.99, season: "Winter"},
//     {name: ' Sunshine Orange', price: 2.99, season: "Fall"},
// ])