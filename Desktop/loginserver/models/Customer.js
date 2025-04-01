

const { default: mongoose } = require("mongoose")
const mongoosem = require("mongoose")


const customerSchema= new mongoosem.Schema({
    Name:{
        type:String ,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const Customer = mongoose.model('Customer' , customerSchema);
module.exports= Customer ;
