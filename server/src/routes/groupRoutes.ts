import { Router } from "express";
import { addMemberToGroup, makeGroup } from "../controllers/groupControllers";
import { verifyLogin } from "../middleware/verifyLogin";
import { addMemberToGroupValidation, groupCreationValidation } from "../validation/validationFun";

const route = Router();

route.use(verifyLogin);
route.post("group",groupCreationValidation ,makeGroup);
route.patch("group/:id",addMemberToGroupValidation ,addMemberToGroup);

export default route