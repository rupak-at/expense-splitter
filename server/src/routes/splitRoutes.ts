import { Router } from "express";
import { getSplit } from "../controllers/splitControllers";
import { verifyLogin } from "../middleware/verifyLogin";

const route = Router();

route.get("/split/:id",verifyLogin , getSplit);

export default route;
