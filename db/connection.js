const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log(`___MongoDB Atlas Connected____`);
}).catch((err)=>{
    console.log(`_____MongoDb Atlas connection failed!!! ${err} `);
})
