import { Router } from "express";
import { createPost, deletePost, getPostUser, updatePostById } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePostById)
router.get('/own', auth, getPostUser)

export {router}