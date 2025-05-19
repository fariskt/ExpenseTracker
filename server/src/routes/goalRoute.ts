import {   Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { isAuthenticate } from "../middleware/verifyToken";
import { createGoals, deleteGoal, deleteSelectedGoal, getUserGoals, updateGoal } from "../controller/goalController";

const goalRoute = Router();

goalRoute.get("/", isAuthenticate , asyncHandler(getUserGoals))
goalRoute.post("/create", isAuthenticate, asyncHandler(createGoals))
goalRoute.put("/update/:goalId", isAuthenticate, asyncHandler(updateGoal))
goalRoute.delete("/deleteMany", isAuthenticate, asyncHandler(deleteSelectedGoal))
goalRoute.delete("/delete/:goalId", isAuthenticate, asyncHandler(deleteGoal))

export default goalRoute;
