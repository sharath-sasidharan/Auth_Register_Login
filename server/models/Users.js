const mongoose = require('mongoose');

//! Schema Design

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true
},

password:{
    type:String,
    required:true,
    trim:true
},
cpassword:{
    type:String,
    required:true,
    trim:true
}
})

//! User Model
module.exports = mongoose.model('User',userSchema)