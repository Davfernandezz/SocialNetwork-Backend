import { Router } from "express";
import { createPost, deletePost } from "./posts.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)

export {router}