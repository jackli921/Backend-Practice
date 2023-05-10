const express = require('express')
const router = express.Router()

router.use((req, res, next)=>{
    if(req.query.isAdmin){
        next()
    }
    res.send("Not Authorized")

})

router.get("/", (req, res) => {
  res.send("Admin's hompage");
});
router.get("/:id", (req, res) => {
  res.send("Admin one's page");
});


module.exports = router