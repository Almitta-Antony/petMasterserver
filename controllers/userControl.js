const pets = require("../models/petModel");
const users = require("../models/userModel");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(404).json("user already exist !! please login")
        }
        else {
            const newUser = new users({
                userName, email, password, phone: "", address: "", profile: ""
            })
            //store the newuser collection in mongodb database and save it in the database
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`Register API failed ${err}`)
    }
}

//login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await users.findOne({ email, password })
        if (existUser) {
            //login success-generate token
            const token = jwt.sign({ _id: existUser._id }, "supersecretkey123")
            console.log(token);

            res.status(200).json({
                user: existUser,
                token
            })
        }
        else {
            res.status(404).json("incorrect email or password")
        }
    }
    catch (err) {
        res.status(401).json(`Register API failed ${err}`)

    }
}


//update-profile
exports.editProfile = async (req, res) => {
    const { userName, address, phone, profile } = req.body
    const { _id } = req.params
    const profile1 = req.file ? req.file.filename : profile

    const selectedUser = await users.findOne({ _id })
    try {
        if (selectedUser) {
            selectedUser.userName = userName
            selectedUser.address = address
            selectedUser.phone = phone
            selectedUser.profile = profile1

            //save change in mongodb
            await selectedUser.save()
            res.status(200).json(selectedUser)

        }

        else {
            res.status(404).json(`${userName} is not present`)
        }
    }
    catch (err) {
        res.status(401).json(`${err} updateapi failed`)

    }
}


//add-pet 
exports.addPet = async (req, res) => {
    const { breed, age, category, price, description } = req.body

    //image from multer
    const petImage = req.file?.filename

    //userid access from jwt middleware
    const userId = req.payload


    try {
        const existingPet = await pets.findOne({ description })
        if (existingPet) {
            res.status(400).json(`${existingPet} already exist !!!`)
        }
        else {
            const newPet = new pets({
                breed, age, category, price, description, userId, petImage
            })
            //save
            await newPet.save()
            res.status(200).json(newPet)
        }
    }
    catch (err) {
        res.status(401).json(`Pet Add Api failed ${err}`)
    }
}


//get user pets
exports.getUserPets = async (req, res) => {
    const { id } = req.params
    try {
        const petsArray = await pets.find({ userId: id })
        if (petsArray) {
            res.status(200).json(petsArray)

        }
        else {
            res.status(404).json(`No pets added yet`)

        }
    }
    catch (err) {
        res.status(401).json(`Pets get Api Failed ${err} `)
    }
}


//get user pets
exports.getAllPets = async (req, res) => {

    //query data
    const searchQuery = req?.query?.search
    try {
        //regular expression query
        const query = {
            category: { $regex: searchQuery, $options: 'i' }
        }
        const allPetsArray = await pets.find(query)
        if (allPetsArray.length > 0) {
            res.status(200).json(allPetsArray)

        }
        else {
            res.status(404).json(`No pets added yet`)

        }
    }
    catch (err) {
        res.status(401).json(`All Pets Api Failed ${err} `)
    }
}


//get user pets
exports.getHomePetsImage = async (req, res) => {

    try {
        const homePetsImage = await pets.find()
        if (homePetsImage) {
            res.status(200).json(homePetsImage)

        }
        else {
            res.status(404).json(`No pets added yet`)

        }
    }
    catch (err) {
        res.status(401).json(`All Pets Api Failed ${err} `)
    }
}

//update pet details
exports.editPet = async (req, res) => {
    const { breed, age, category, price, description, petImage } = req.body

    //userid access from jwt middleware
    const { _id } = req.params
    const uploadImage = req.file ? req.file.filename : petImage


    try {
        const updatedPet = await pets.findByIdAndUpdate({ _id },
            { breed, age, category, price, description, petImage: uploadImage },
            { new: true })
        await updatedPet.save()
        res.status(200).json(updatedPet)
    }
    catch (err) {
        res.status(401).json(`update Pets Api Failed ${err} `)

    }

}


exports.deletePet=async(req,res)=>{
    const {_id}=req.params
    try{
        const response= await pets.deleteOne({_id})
        if(response.deletedCount === 1){
            res.status(200).json("project deleted!!")
        }
        else {
            // The resource with the given ID was not found
            res.status(404).json({ message: "Pet not found." });
          }

    }
    catch(err){
        res.status(401).json(`update Pets Api Failed ${err} `)

    }

}