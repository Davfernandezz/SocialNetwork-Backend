import { Router } from "express";
import { deleteUserById, getAllUsers, getUserProfile, updateUserProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.get('/', auth, isAdmin, getAllUsers)
router.get('/profile', auth, getUserProfile)
router.put('/profile', auth, updateUserProfile)
router.delete('/:id', auth, isAdmin, deleteUserById)

export { router }