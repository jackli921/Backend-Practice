const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("see all ramen")
})

router.post('/', (req,res)=>{
    res.send("adding one ramen")
})

router.get('/:id', (req,res)=>{
    res.send("see one ramen")
})

router.get('/:id/edit', (req,res)=>{
    res.send("edit one ramen")
})

module.exports = router