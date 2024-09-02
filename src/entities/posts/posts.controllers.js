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
};

//DELETE
export const deletePost = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const userRole = req.tokenData.role;
        const postIdToDelete = req.params.id;
        const postIdToDeleteIsValid = Types.ObjectId.isValid(postIdToDelete);
        if (!postIdToDeleteIsValid) {
          return res.status(400).json({
            success: false,
            message: "Id not valid",
          });
        }
        const post = await Post.findById(postIdToDelete);
        if (post.userId.toString() !== userId && userRole !== "admin") {
          return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this post",
          });
        }
        await Post.findByIdAndDelete(postIdToDelete);
        res.status(200).json({
          success: true,
          message: "Post deleted",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error deleting post",
          error: error.message,
        });
      }
    };
    

//UPDATE
export const updatePostById = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const userRole = req.tokenData.role;
        const postId = req.params.id;
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "No post description found",
            });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        if (post.userId.toString() !== userId && userRole !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post",
            });
        }
        post.description = description;
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message
        });
    }
};

//UPDATE
export const updateMyPostById = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const postId = req.params.id; 
        const { description } = req.body; 
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "No post description found",
            });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        if (post.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post",
            });
        }
        post.description = description;
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message
        });
    }
};

//GET
export const getPostUser = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const posts = await Post.find({
            userId: userId
        });
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user posts",
            error: error.message
        });
    }
};

//GET
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({})
            .select('description like userId')
            .populate('userId', 'email');

        res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving all posts',
            error: error.message
        });
    }
};

//GET
export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .select('description like userId')
            .populate('userId', 'email');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving post by id",
            error: error.message,
        });
    }
};

//GET
export const getPostUserById = async (req, res) => {
    try {
        const postId = req.params.id;
        const posts = await Post.find({ userId: postId });
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User without posts",
            });
        }
        res.status(201).json({
            success: true,
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error when retrieving posts from a user",
            error: error.message,
        });
    }
};

//PUT
export const putLikeById = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.tokenData.id
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        const userLiked = post.like.indexOf(userId)
        let message = ""
        if (userLiked === -1) {
            post.like.push(userId)
            message = "Like added"
        } else {
            post.like.splice(userLiked, 1)
            message = "Like removed"
        }
        await post.save()
        res.json({
            success: true,
            message: message,
            data: {
                like: post.like
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating like on the post",
            error: error.message
        })
    }
}