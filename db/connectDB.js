import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to db ==> ${process.env.MONGO_URL} successfully`);
    } catch (error) {
        console.log('Error connecting to DB ==>' , error.message);
    }  
}

export default connectDB