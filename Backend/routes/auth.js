const  {signUp,signIn} = require("../controllers/auth")
const express = require("express")
const verify = require("../middleware/CheckUser")
const router = express.Router()


router.post("/",signUp)
router.post("/sign-in",signIn)
router.get("/dashboard",verify,(req,res) => {
    console.log(req.user)
})

module.exports =  router;