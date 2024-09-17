import express from 'express'
import { createUser, loginUser} from '../controllers/userController'

const router = express.Router()


//Create New User (Register)
router.post('/users', createUser)

//Login User
router.post('/users/login', loginUser)



export default router