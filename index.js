//load .env file
require('dotenv').config()

//import express
const express=require('express')

//creating server using express
const projectServer=express()

//import cors
const cors=require('cors')

//import routes
const routes=require('./Routes/routes')
require('./db/connection')


//connecting cors with client side
projectServer.use(cors())

//converting all js data to json
projectServer.use(express.json())

projectServer.use(routes)

//export uploads folder to the frontend
projectServer.use('/uploads',express.static('./uploads'))


//set a port number to run projectserver
const PORT=4000 || process.env.PORT

projectServer.listen(PORT,()=>{
    console.log(`_____ProjectServer Started at PORT Number ${PORT}____`);
})