import { Router } from "express";
import { router as authRoutes} from './entities/auth/auth.routes.js'
import { router as usersRoutes } from './entities/users/users.routes.js'
import { router as postsRoutes } from './entities/posts/posts.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)

export default router