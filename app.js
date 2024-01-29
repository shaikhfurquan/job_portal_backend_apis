import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRouter from './routes/testRoute.js';
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000


//Express middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



//routes
app.use('/api/v1/', testRouter)
app.use('/api/v1/user', userRouter)


// Validation Middleware
app.use(errorMiddleware)

//DB Configuration
connectDB()

//listening port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})