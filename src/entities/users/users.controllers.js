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
        const userIdToUpdate = req.params.id;
        const body = req.body;
        const user = await User.findByIdAndUpdate(userIdToUpdate, body, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User profile updated',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message,
        });
    }
};