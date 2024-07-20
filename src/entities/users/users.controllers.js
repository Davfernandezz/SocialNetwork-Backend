import bcrypt from "bcrypt";
import User from "./user.model.js";

//GET
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'email');
        res.status(200).json({
            success: true,
            message: 'Users retrived successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrievening users',
            error: error.message
        });
    }
};

//GET
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving profile',
            error: error.message
        });
    }
};

//PUT
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.id
        const { name, email, password } = req.body
        let hashedPassword
        if (!name && !email && !password) {
            return res.status(400).json({
                success: false,
                Message: "Enter the corresponding data",
            })
        }
        if (password.length < 8 || password.length > 15) {
            return res.status(400).json({
                success: false,
                message: "Password is not valid, 8 to 15 charachters must be needed",
            })
        }
        if (password) {
            hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        }
        const userProfileUpdate = await User.findOneAndUpdate({ _id: userId },
            {
                name: name,
                email: email,
                password: hashedPassword
            })
        return res.status(200).json({
            success: true,
            Message: "User profile updated",
            data: userProfileUpdate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message,
        });
    }
};