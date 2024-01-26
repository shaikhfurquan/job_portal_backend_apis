
// Error handling Middleware || Next function

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        err
    })
}


export default errorMiddleware