const mongoose=require('mongoose')

const petSchema=new mongoose.Schema({

    breed:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true 
    },
    petImage:{
        type:String,
        required:true 
    },
    category:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true 
    },
    
    userId:{
        type:String,
        required:true 
    },
    price:{
        type:String,
        required:true 
    }
})

const pets=new mongoose.model("pets",petSchema)

module.exports=pets