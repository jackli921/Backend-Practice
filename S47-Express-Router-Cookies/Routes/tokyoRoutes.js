const express = require('express')
const router = express.Router()





router.get('/', (req,res)=>{
    res.send("Showing all cafes")
})
router.get('/:id', (req,res)=>{
    res.send("Showing one cafe")
})
router.post('/', (req,res)=>{
    res.send("adding one cafe")
})
router.get('/:id/edit', (req,res)=>{
    res.send("editing one cafe")
})

module.exports = router