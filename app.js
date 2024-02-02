import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// security packages
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize';

import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRouter from './routes/testRoute.js';
import jobRouter from './routes/jobsRoute.js';
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000


//Express middlewares
app.use(helmet());      //for header security
app.use(xss())          //cross side scripting attack protection
app.use(mongoSanitize()); //for secure express/mongodb 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



//routes
app.use('/api/v1/', testRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)


// Validation Middleware
app.use(errorMiddleware)

//DB Configuration
connectDB()

//listening port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})