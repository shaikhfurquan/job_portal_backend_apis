import express from 'express'
import { getUser, registerUser } from '../controllers/userController.js'
const userRouter = express.Router()


userRouter.post('/register' , registerUser)
userRouter.get('/' , getUser)


export default userRouter