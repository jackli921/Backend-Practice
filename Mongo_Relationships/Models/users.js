const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDB')
    .then(()=>{
        console.log("MongoDB Connection Open")
    })
    .catch(err =>{
        console.log("MOngo Connection Error!",err)
    })

// make a schema
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses:[
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

// make a model
const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    User.deleteMany({})

    const u = new User({
        first: "Sherlock",
        last: "Holmes"
    })

    u.addresses.push({
        street: '123 Baker Street',
        city: "London",
        state: "N/A",
        country: "England"
    })

    const res = await u.save()
    
}

const addAddress = async(id) =>{
    const user = await User.findById("6453c91553b185d316be12d1");
    
    user.addresses.push({
      street: "The Hollow",
      city: "London",
      state: "N/A",
      country: "England",
    });
    const res = await user.save()
    console.log(res)
}

addAddress()