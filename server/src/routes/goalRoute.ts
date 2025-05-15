import {   Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { isAuthenticate } from "../middleware/verifyToken";
import { createExpenses, getUserExpenses } from "../controller/expenseController";
import { createGoals, getUserGoals } from "../controller/goalController";

const goalRoute = Router();

goalRoute.get("/", isAuthenticate , asyncHandler(getUserGoals))
goalRoute.post("/create", isAuthenticate, asyncHandler(createGoals))

export default goalRoute;
