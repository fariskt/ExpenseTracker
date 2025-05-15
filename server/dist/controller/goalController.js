"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoals = exports.getUserGoals = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUserGoals = async (req, res) => {
    const { userId } = req.user;
    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const goals = await db_1.default.goal.findMany({ where: { userId } });
    if (!goals) {
        return res.status(404).json({ message: "Goals not found" });
    }
    return res.status(200).json({ message: "Goals fetched successfully", goals });
};
exports.getUserGoals = getUserGoals;
const createGoals = async (req, res) => {
    const { deadline, ...rest } = req.body;
    const { userId } = req.user;
    if (!deadline) {
        return res.status(404).json({ message: "Please provide a deadline" });
    }
    const newGoal = await db_1.default.goal.create({
        data: {
            userId,
            deadline: new Date(deadline),
            ...rest,
        },
    });
    return res
        .status(201)
        .json({ message: "Goal created succesfully", data: newGoal });
};
exports.createGoals = createGoals;
