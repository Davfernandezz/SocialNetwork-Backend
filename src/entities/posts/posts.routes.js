import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostById, getPostUser, getPostUserById, putLikeById, updateMyPostById, updatePostById } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePostById)
router.put('/own/:id', auth, updateMyPostById)
router.get('/own', auth, getPostUser)
router.get('/', auth, getAllPost)
router.get('/:id', auth, getPostById)
router.get('/users/:id', auth, getPostUserById)
router.put('/like/:id', auth, putLikeById)

export { router }