import express from 'express'
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js'
import isAuthenticated from "../middlewares/authMiddleware.js";
import { rateLimit } from 'express-rate-limit'

const userRouter = express.Router()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})


userRouter.post('/register' , limiter ,  registerUser)
userRouter.get('/' , getUser)
userRouter.post('/login' , limiter ,loginUser)
userRouter.put('/update' , isAuthenticated ,updateUser)


export default userRouter