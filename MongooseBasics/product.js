const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("Error occurred");
    console.log(err);
  });

  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required : true,
      maxlength:20
    },
    price: {
      type: Number,
      required : true,
      min: 0
    },
    isOnSale: {
      type: Boolean,
      default:false
    },
    categories:[String],
    size:{
        type: String,
        enum: ['S', 'M', 'L']
    },
    qty:{
        online:{
            type: Number,
            default:0
        },
        inStore:{
            type:Number,
            default:0
        }
    }
  });

  productSchema.methods.greet = function() {
    console.log("Hello Hi! Howdy!")
    console.log(`Greetings from - ${this.name}`)
  }

  productSchema.methods.toggleOnSale = function(){
    this.isOnSale = !this.isOnSale;
    return this.save()
  }
  
  productSchema.methods.addCategory = function(newCat){
    return this.categories.push(newCat)
  }

   productSchema.statics.fireSale = function() {
    return this.updateMany({}, {isOnSale: true, price: 0})
    }

  const Product = mongoose.model('Product', productSchema)

  
  const findProduct = async ()=>{
    const foundProduct = await Product.findOne({name: 'Shirt'})
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory("Outdoor")
    console.log(foundProduct)

}

Product.fireSale()
    .then(res => console.log(res))

// findProduct()

//   const bike = new Product({
//     name: 'Shirt',
//     price: 59,
//     size: 'S',
//     categories:["Safety", "cycling"],
//   })

//   bike.save()
//     .then(data =>{
//         console.log("IT worked!")
//         console.log(data)
//     })
//     .catch(err =>{
//         console.log("NOH NO ERROR")
//         console.log(err.errors)
//     })