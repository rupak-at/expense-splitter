import { Router } from "express";
import { getSplit } from "../controllers/splitControllers";
import { isGroupAdmin } from "../middleware/isGroupAdmin";
import { verifyLogin } from "../middleware/verifyLogin";

const route = Router();

route.get("/split/:id",verifyLogin ,isGroupAdmin, getSplit);

export default route;
