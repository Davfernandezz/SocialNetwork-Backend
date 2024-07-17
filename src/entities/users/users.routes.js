import { Router } from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.get('/',auth , getAllUsers)
router.get('/profile',auth , getUserProfile)
router.put('/profile/:id',auth , updateUserProfile)

export {router}