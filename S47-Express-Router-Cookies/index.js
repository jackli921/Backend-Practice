const express = require('express')
const app = express()
const ramenRoutes = require('./Routes/ramen')
const tokyoRoutes = require('./Routes/tokyoRoutes')


app.use("/fukuoka/ramen", ramenRoutes);
app.use("/tokyo/cafe", tokyoRoutes )


app.listen(3030, (req,res)=>{
    console.log('listening on port 3030')
})