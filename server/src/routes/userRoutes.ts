import {Router} from "express"
import { loginUser, registerUser } from "../controllers/userControllers";
import { loginValidation, validateRegisterUser } from "../validation/validationFun";

const route = Router();

route.post("/register", validateRegisterUser ,registerUser)
route.post("/login",loginValidation , loginUser)

export default route