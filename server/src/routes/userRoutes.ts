import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/userControllers";
import { loginValidation, validateRegisterUser } from "../validation/validationFun";

const route = Router();

route.post("/register", validateRegisterUser ,registerUser)
route.post("/login",loginValidation , loginUser)
route.get("/logout", logoutUser)

export default route