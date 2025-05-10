import {Router} from "express"
import { getExpenses, receiveExpense } from "../controllers/expenseControllers";
import { verifyLogin } from "../middleware/verifyLogin";
import { validateExpense } from "../validation/validationFun";

const route = Router();

route.use(verifyLogin);
route.post("/expense",validateExpense, receiveExpense);
route.get("/expense:id",getExpenses);

export default route