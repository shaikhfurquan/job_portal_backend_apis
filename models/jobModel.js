import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    company : {
        type : String,
        required : [true, 'Company name is required'],
        minlength : 100
    },
    position :{
        type : String,
        required : [true, 'Job position is required'],
        minlength : 100
    },
    status :{
        type : String,
        enum : ['pending', 'reject', 'interview'],
        default : 'pending'
    },
    workType : {
        type : String,
        enum : ['full-time', 'part-time', 'internship' , 'contract'],
        default : 'full-time'
    },
    workLocation : {
        type : String,
        default : 'Mumbai',
        required : [true, 'work location is required'],
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})


const JobModel = mongoose.model('Job' , jobSchema)

export default JobModel