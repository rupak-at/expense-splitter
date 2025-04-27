import {Router} from "express"
import { loginUser, registerUser } from "../controllers/userControllers";
import { loginValidation, validateRegisterUser } from "../validation/validationFun";
import { verifyLogin } from "../middleware/verifyLogin";

const route = Router();

route.post("/register", validateRegisterUser ,registerUser)
route.post("/login",loginValidation , loginUser)

export default route