import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostdById, getPostUser, getPostUserById, putLikeById, updatePostById } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePostById)
router.get('/own', auth, getPostUser)
router.get('/', auth, getAllPost)
router.get('/:id', auth, getPostdById)
router.get('/users/:id', auth, getPostUserById)
router.put('/like/:id', auth, putLikeById)

export { router }