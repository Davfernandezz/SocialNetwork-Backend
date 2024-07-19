import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostdById, getPostUser, getPostUserById, updatePostById } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePostById)
router.get('/own', auth, getPostUser)
router.get('/', auth, getAllPost)
router.get('/:id', auth, getPostdById)
router.get('/user/:id', auth, getPostUserById)

export {router}