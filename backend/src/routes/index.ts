import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../docs";
import userRoute from "./userRoute";
import eventRoute from "./eventRoute";
import bookingRoutes from "./bookingRoutes"

const url = `/api/${process.env.API_VERSION || "v1"}`;

const router = Router();

router.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerOptions));
router.use(`${url}/user`, userRoute)
router.use(`${url}/event`, eventRoute)
router.use(`${url}/booking`, bookingRoutes)
router.all(`${url}/`, (req, res) => {
	return res.status(200).send({
		status: 200,
		message: "Default API endpoint",
	});
});

router.all(`*`, (req, res) => {
	return res.status(404).json({
		status: 404,
		message: "This endpoint is not exist",
	});
});

export default router;