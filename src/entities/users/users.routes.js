import { Router } from "express";
import { login, register } from "./users.controllers.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)

export {router}