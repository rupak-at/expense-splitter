import { Router } from "express";
import { addMemberToGroup, deleteGroup, getGroup, makeGroup, removeMemberFromGroup } from "../controllers/groupControllers";
import { verifyLogin } from "../middleware/verifyLogin";
import { addMemberToGroupValidation, groupCreationValidation } from "../validation/validationFun";

const route = Router();

route.use(verifyLogin);
route.post("/group",groupCreationValidation ,makeGroup);
route.patch("/group/:id",addMemberToGroupValidation ,addMemberToGroup);
route.delete("/group/:id" ,deleteGroup);
route.patch("/group/:id/remove" ,removeMemberFromGroup);
route.get("/group" ,getGroup);

export default route