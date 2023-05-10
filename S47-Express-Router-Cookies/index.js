const express = require('express')
const router = express.Router()
const app = express()



const tokyoRoutes = require('./Routes/tokyoRoutes')
const adminRoutes = require('./Routes/admin')


app.use('/cafes', tokyoRoutes)
app.use('/admin', adminRoutes)

app.listen(3030, (req,res)=>{
    console.log('listening on port 3030')
})