import UserModel from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            next("All fields are required")
        }

        const existingUser = await UserModel.findOne({ email: email })
        if (existingUser) {
            next("User already registered, Please Login!")
        }

        const newUser = (await UserModel.create({ name, email, password }))

        const token = newUser.createJWT()
        res.status(200).json({
            success: true,
            message: "User  registered, successfully",
            newUser: {
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
                location: newUser.location
            },
            token: token
        });
    } catch (error) {
        next(error.message);
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation 
        if (!email || !password) {
            next("please provide all fields")
        }

        const user = await UserModel.findOne({ email }).select("+password")
        if (!user) {
            next("User not found, Register first")
        }

        //compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            next("Invalid credentials")
        }
        // user.password = undefined
        const token = user.createJWT()
        res.status(200).json({
            success: true,
            message: `Login successful, Welcome ${user.name}`,
            user: user,
            token: token

        });
    } catch (error) {
        next(error.message);
    }
}


export const getUser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            // users : users
        });
    } catch (error) {
        next(error.message);
    }
}