import { Types } from "mongoose"
import Post from "./post.model.js";
import User from "../users/user.model.js"

//POST
export const createPost = async (req, res) => {
    try {
        const { description } = req.body
        const userId = req.tokenData.id
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Invalid description"
            })
        }
        const user = await User.findOne({
            _id: userId
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }
        const newPost = await Post.create(
            {
                description: description,
                userId: userId,
            }
        )
        res.status(200).json(
            {
                success: true,
                message: "Post created",
                data: newPost,
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error creating post',
                error: error.message
            }
        )
    }
}

//DELETE
export const deletePost = async (req, res) => {
    try {
        const idPost = req.params.id
        const idToDeleteValid = Types.ObjectId.isValid(idPost)

        if (!idToDeleteValid) {
            return res.status(400).json({
                success: false,
                message: "Id not valid"
            })
        }
        const deletedPost = await Post.findByIdAndDelete(idPost)
        if (!deletedPost) {
            return res.status(404).json({
                succes: false,
                message: "Not Post found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Post deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message
        })
    }
}

//UPDATE
export const updatePostById = async (req, res) => {
    try {
        const postIdToUpdate = req.params.id; 
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({
                success: false,
                Message: "Enter the corresponding data",
            })
        }
        const post = await Post.findByIdAndUpdate(
            postIdToUpdate,
            { description: description },
            { new: true } 
        );
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Post updated',
            data: post, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating post',
            error: error.message,
        });
    }
};

//GET
export const getPostUser = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const posts = await Post.find(
            {

                where:
                {
                    id: userId
                },

            }

        );
        res.status(200).json(
            {
                success: true,
                message: "post retrived successfully",
                data: posts
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                susscess: false,
                message: "error retrieving user posts",
                error: error
            }
        )
    }
}

