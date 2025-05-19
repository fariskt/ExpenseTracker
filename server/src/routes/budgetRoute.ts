import {   Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { isAuthenticate } from "../middleware/verifyToken";
import { createBudgets, deleteBudget, deleteSelectedBudget, getUserBudgets, updateBudget } from "../controller/budgetController";

const budgetRoute = Router();

budgetRoute.get("/", isAuthenticate , asyncHandler(getUserBudgets))
budgetRoute.post("/create", isAuthenticate, asyncHandler(createBudgets))
budgetRoute.put("/update/:budgetId", isAuthenticate, asyncHandler(updateBudget))
budgetRoute.delete("/deleteMany", isAuthenticate, asyncHandler(deleteSelectedBudget))
budgetRoute.delete("/delete/:budgetId", isAuthenticate, asyncHandler(deleteBudget))

export default budgetRoute;
