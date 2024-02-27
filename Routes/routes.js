const express=require('express')

//router object
const router=new express.Router()
const user=require('../controllers/userControl')
const upload = require('../middlewares/multerMiddleware')
const { jwtMiddleware } = require('../middlewares/jwtmiddleware')


//signup
router.post('/user/register',user.register)

//login
router.post('/user/login',user.login)

//update profile
router.put('/user/update-profile/:_id',jwtMiddleware,upload.single('profile'),user.editProfile)

//add pet
router.post('/user/add-pet',jwtMiddleware,upload.single('petImage'),user.addPet)


//get user all pets
router.get('/user/get-user-pets/:id',jwtMiddleware,user.getUserPets)

//get all pets
router.get('/user/get-all-pets',user.getAllPets)

//get all pets
router.get('/user/get-home-pets',user.getHomePetsImage)

//update pet details
router.put('/user/edit-pets/:_id',jwtMiddleware,upload.single('petImage'),user.editPet)

//delete user  pets
router.delete('/user/delete-pets/:_id',jwtMiddleware,user.deletePet)



module.exports=router