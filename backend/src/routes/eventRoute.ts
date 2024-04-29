import express from "express"
import EventController from "../controllers/eventController"
import { isLoggedIn } from "../middlewares/authentication"
import { auth } from "../middlewares/authorization"

const router = express.Router()

router.post("/create",isLoggedIn,auth, EventController.createEvent)
router.get("/allevents",isLoggedIn,auth,EventController.getAllEventsAdmin)
router.put("/update",isLoggedIn,auth,EventController.updateEventDetails)
router.delete("/delete", isLoggedIn,auth,EventController.deleteEvent)

export default router
