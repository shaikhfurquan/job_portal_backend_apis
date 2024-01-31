import express  from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";
import { createJob, getAllJob, updateJobById , deleteJobById, jobStats} from "../controllers/jobController.js";

const jobRouter = express.Router()

jobRouter.post('/create-job' , isAuthenticated, createJob)
jobRouter.get('/get-job' , isAuthenticated, getAllJob)
jobRouter.patch('/update-job/:id' , isAuthenticated, updateJobById)
jobRouter.delete('/delete-job/:id' , isAuthenticated, deleteJobById)

jobRouter.get('/job-stats' , isAuthenticated, jobStats)

export default jobRouter