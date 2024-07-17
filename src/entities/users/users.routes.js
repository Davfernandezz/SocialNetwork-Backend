import { Router } from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.get('/',auth ,isAdmin , getAllUsers)
router.get('/profile',auth , getUserProfile)
router.put('/profile/:id',auth , updateUserProfile)

export {router}