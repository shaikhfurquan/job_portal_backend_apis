import JobModel from "../models/jobModel.js"


export const createJob = async (req, res, next) => {
    try {
        const {company, position} = req.body
        if(!company || !position) {
            next("Please provide all fields")
        }
        req.body.createdBy = req.user.userId
        const job = await JobModel.create(req.body)
        res.status(201).json({
            success : true,
            message : "Job created successfully",
            job : job
        })

    } catch (error) {
        next(error.message)
    }
}