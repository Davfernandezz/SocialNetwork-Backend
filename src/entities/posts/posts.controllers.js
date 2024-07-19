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
};

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
        const posts = await Post.find({}, 'description');
        res.status(200).json({
            success: true,
            message: 'Posts retrived successfully',
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrievening all posts',
            error: error.message
        });
    }
};

//GET
export const getPostdById  = async (req, res) => {
    try {
        const postId = req.params.id;

    const post = await Post.findOne(
        {
            _id: postId
        }
    )
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
export const getPostUserById  = async (req, res) =>{
    try {
        const userId = req.params.id;
        const posts = await Post.find({ userId: userId });
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