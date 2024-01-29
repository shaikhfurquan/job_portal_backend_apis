import express  from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";
import { createJob } from "../controllers/jobController.js";

const jobRouter = express.Router()

jobRouter.post('/create-job' , isAuthenticated, createJob)

export default jobRouter