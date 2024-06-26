import mongoose from "mongoose"
import JobModel from "../models/jobModel.js"
import moment from "moment"


export const createJob = async (req, res, next) => {
  try {
    const { company, position } = req.body
    if (!company || !position) {
      next("Please provide all fields")
    }
    req.body.createdBy = req.user.userId
    const job = await JobModel.create(req.body)
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: job
    })

  } catch (error) {
    next(error.message)
  }
}


export const getAllJob = async (req, res, next) => {
  try {

    // console.log("req user==>" , req.user);
    const {status, workType, search, sort} = req.query
    // conditions for searching filters on the basis of createdBy(userId)
    const queryObject = {
      createdBy : req.user.userId
    }

    //filters logic on the basis of status
    if(status && status !== 'all'){
      queryObject.status = status
    }
    
    //filters logic on the basis of workType
    if(workType && workType !== 'all'){
      queryObject.workType = workType
    }

    if(search){
      queryObject.position = {$regex : search , $options : 'i'} 
    }

    let queryResult = JobModel.find(queryObject)

    //sorting by latest/oldest jobs
    if(sort == "lastest"){
      queryResult = queryResult.sort("-createdAt")
    }
    if(sort == "oldest"){
      queryResult = queryResult.sort("createdAt")
    }
    if(sort == "a-z"){
      queryResult = queryResult.sort("position")
    }
    if(sort == "z-a"){
      queryResult = queryResult.sort("-position")
    }

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult = queryResult.skip(skip).limit(limit)

    const totalJobs = await JobModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs / limit)


    const jobs = await queryResult

    // const jobs = await JobModel.find({ createdBy: req.user.userId })

    res.status(201).json({
      success: true,
      totalJobs: totalJobs,
      jobs: jobs,
      numOfPage : numOfPage
    })

  } catch (error) {
    next(error.message)
  }
}


export const updateJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
      next("Please provide all fields");
    }
    // finding the job according to user\owner only
    const job = await JobModel.findOne({ _id: id });

    if (!job) {
      next(`No jobs found with this ${id}`);
    }

    // validation for updating the job w.r.t to the user\owner only
    if (!req.user.userId === job.createdBy.toString()) {
      next("You are not allowed to update this job")
      return
    }

    const updatedJob = await JobModel.findOneAndUpdate(
      { _id: id }, req.body, { new: true, runValidators: true }
    );


    res.status(200).json({
      success: true,
      updatedJob: updatedJob
    });
  } catch (error) {
    next(error.message);
  }
};


export const deleteJobById = async (req, res, next) => {
  try {
    const { id } = req.params
    // finding the job on the basis of this id
    const job = await JobModel.findOne({ _id: id })
    if (!job) {
      next(`No job found with this Id ${id}`);
    }
    // only user/owner delete this job
    if (!req.user.userId === job.createdBy.toString()) {
      next('You are not allowed to delete this job')
      return
    }
    await job.deleteOne()
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    })
  } catch (error) {
    next(error.message)
  }
}


// jobs state and filters
export const jobStats = async (req, res, next) => {
  try {
    const stats = await JobModel.aggregate([
      // search by user jobs
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    //default stats
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview: stats.interview || 0,
    };

    //monthly yearly stats
    let monthlyApplication = await JobModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    monthlyApplication = monthlyApplication.map((item) => {
      const { _id: { year, month }, count, } = item;
      const date = moment().month(month - 1).year(year).format("MMM Y");
      return { date, count };
    }).reverse();
    res.status(200).json({
      success: true,
      totlaJob: stats.length,
      defaultStats,
      monthlyApplication
    });

  } catch (error) {
    next(error.message)
  }
}