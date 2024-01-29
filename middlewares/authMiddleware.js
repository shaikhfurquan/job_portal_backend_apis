import JWT from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization
        if (!authHeaders || !authHeaders.startsWith('Bearer')) {
            next('Authentication failed Failed, There is no token available')
        }

        const token = authHeaders.split(' ')[1]
        
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        })
    }
}


export default isAuthenticated