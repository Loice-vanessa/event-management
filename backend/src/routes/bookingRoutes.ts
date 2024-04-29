import express from "express"
import { isLoggedIn } from "../middlewares/authentication"
import BookingController from "../controllers/bookingController"

const router = express.Router()

router.post('/eventBooking', isLoggedIn, BookingController.createBooking)

export default router
