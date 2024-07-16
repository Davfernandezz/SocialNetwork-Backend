import bcrypt from "bcrypt";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

//POST
export const register = async (req, res) => {
    try {
        const { email, password } = req.body

        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))

        const newUser = await User.create({
            email: email,
            password: hashedPassword
        })
        res.status(200).json({
            success: true,
            message: "User created",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        })
    }
}

//POST
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are needed"
            })
        }
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password not valid"
            })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                succes: false,
                message: "Email or password not valid"
            })
        }
       const token = jwt.sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return res.status(200).json({
            success: true,
            Message: "User logged",
            id: user.id,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error log in user",
            error: error.message
        })
    }
}