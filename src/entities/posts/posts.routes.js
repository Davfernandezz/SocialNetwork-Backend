import { Router } from "express";
import { createPost, deletePost, updatePostById } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePostById)

export {router}