import UserModel from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).json({ success: false, message: "All fields are required" })
        }

        const existingUser = await UserModel.findOne({ email: email })
        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already registered, Please Login!" })
        }

        const newUser = await UserModel.create({ name, email , password})
        res.status(200).json({
            success: true,
            message: "User  registered, successfully",
            newUser : newUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while registering user",
            error: error.message
        })
    }
}
export const getUser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            // users : users
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while getting user",
            error: error.message
        })
    }
}