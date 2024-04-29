import express from "express"
import UserController from "../controllers/userController"
import { isLoggedIn } from "../middlewares/authentication"

const router = express.Router()

router.post('/signup', UserController.createUser)
router.post('/login', UserController.login)
router.put('/logout',isLoggedIn, UserController.logout)

export default router