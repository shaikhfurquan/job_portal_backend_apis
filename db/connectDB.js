import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to db successfully ==> ${process.env.MONGO_URL} `);
    } catch (error) {
        console.log('Error connecting to DB ==> ' , error.message);
    }  
}

export default connectDB