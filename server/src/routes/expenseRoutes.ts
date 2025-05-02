import {Router} from "express"
import { receiveExpense } from "../controllers/expenseControllers";
import { verifyLogin } from "../middleware/verifyLogin";
import { validateExpense } from "../validation/validationFun";

const route = Router();

route.use(verifyLogin);
route.post("/expense",validateExpense, receiveExpense);

export default route