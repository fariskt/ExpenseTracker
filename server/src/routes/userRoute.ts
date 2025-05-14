import {   Router } from "express";
import { createUser, getUserData, loginUser } from "../controller/userController";
import { validateRequest } from "../middleware/validateRequest";
import { registerUserSchema, loginUserSchema } from "../utils/validators/userValidators";
import { asyncHandler } from "../middleware/asyncHandler";
import passport from "passport";
import { isAuthenticate } from "../middleware/verifyToken";

const userRouter = Router();

userRouter.post("/signup",validateRequest(registerUserSchema) ,asyncHandler(createUser));
userRouter.post("/login",validateRequest(loginUserSchema) ,asyncHandler(loginUser));
userRouter.get("/me",isAuthenticate, asyncHandler(getUserData));
userRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default userRouter;
