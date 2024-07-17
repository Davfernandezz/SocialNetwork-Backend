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