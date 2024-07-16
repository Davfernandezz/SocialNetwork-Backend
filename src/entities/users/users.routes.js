import { Router } from "express";
import { getAllUsers, getUserProfile, login, register } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/',auth , getAllUsers)
router.get('/profile',auth , getUserProfile)

export {router}