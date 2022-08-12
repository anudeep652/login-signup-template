const mongoose = require("mongoose")
const findOrCreate = require('mongoose-findorcreate')



const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    timestamps:true
})
userSchema.plugin(findOrCreate)

const User = mongoose.model("User",userSchema)


module.exports = User;