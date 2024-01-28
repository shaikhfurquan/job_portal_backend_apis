import express from 'express'
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js'
import isAuthenticated from "../middlewares/authMiddleware.js";
const userRouter = express.Router()


userRouter.post('/register' , registerUser)
userRouter.get('/' , getUser)
userRouter.post('/login' , loginUser)
userRouter.put('/update' , isAuthenticated ,updateUser)


export default userRouter