const mongoose=require('mongoose')

//schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String
      
    },
    address:{
        type:String
    },
    profile:{
        type:String
    }

})

//modal
const users=mongoose.model("users",userSchema)
module.exports=users