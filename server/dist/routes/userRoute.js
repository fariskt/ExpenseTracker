"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const validateRequest_1 = require("../middleware/validateRequest");
const userValidators_1 = require("../utils/validators/userValidators");
const asyncHandler_1 = require("../middleware/asyncHandler");
const passport_1 = __importDefault(require("passport"));
const verifyToken_1 = require("../middleware/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (0, validateRequest_1.validateRequest)(userValidators_1.registerUserSchema), (0, asyncHandler_1.asyncHandler)(userController_1.createUser));
userRouter.post("/login", (0, validateRequest_1.validateRequest)(userValidators_1.loginUserSchema), (0, asyncHandler_1.asyncHandler)(userController_1.loginUser));
userRouter.get("/me", verifyToken_1.isAuthenticate, (0, asyncHandler_1.asyncHandler)(userController_1.getUserData));
userRouter.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
exports.default = userRouter;
