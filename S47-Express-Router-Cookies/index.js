const express = require('express')
const app = express()
const ramenRoutes = require('./Routes/ramen')
const tokyoRoutes = require('./Routes/tokyoRoutes')
const adminRoutes = require('./Routes/admin')

app.use("/fukuoka/ramen", ramenRoutes);
app.use("/tokyo/cafe", tokyoRoutes )
app.use("/admin", adminRoutes)


app.listen(3030, (req,res)=>{
    console.log('listening on port 3030')
})