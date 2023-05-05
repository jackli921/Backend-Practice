const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    category:{
        type: String, 
        enum: ["fruit", "veggie", "dairy", "bread"],
        lowercase: true
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product