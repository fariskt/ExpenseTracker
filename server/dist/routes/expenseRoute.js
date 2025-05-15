import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { isAuthenticate } from "../middleware/verifyToken";
import { createExpenses, getUserExpenses } from "../controller/expenseController";
const expenseRoute = Router();
expenseRoute.get("/", isAuthenticate, asyncHandler(getUserExpenses));
expenseRoute.post("/create", isAuthenticate, asyncHandler(createExpenses));
export default expenseRoute;
