
import express  from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";
const testRouter = express.Router();


testRouter.post('/test-post' , isAuthenticated , (req,res) =>{
    const like = req.body
    res.json({
        success : true,
        like : like

    })
})


export default testRouter