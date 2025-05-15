import { Router } from "express";
import { getNotification } from "../controllers/notificationControllers";
import { verifyLogin } from "../middleware/verifyLogin";

const route = Router();
route.use(verifyLogin)
route.get("/notification/:id", getNotification);

export default route