"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpenses = exports.getUserExpenses = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUserExpenses = async (req, res) => {
    const { userId } = req.user;
    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const expenses = await db_1.default.expense.findMany({ where: { userId } });
    if (!expenses) {
        return res.status(404).json({ message: "Expense not found" });
    }
    return res
        .status(200)
        .json({ message: "Expenses fetched successfully", expenses });
};
exports.getUserExpenses = getUserExpenses;
const createExpenses = async (req, res) => {
    const expenses = req.body;
    const { userId } = req.user;
    if (!expenses) {
        return res.status(404).json({ message: "Please fill the field" });
    }
    const newExpense = await db_1.default.expense.create({ data: {
            userId,
            amount: Number(expenses.amount) || 0,
            category: expenses.category,
            description: expenses.description,
            date: new Date(),
            subject: expenses.subject
        } });
    return res.status(201).json({ message: "Expense created succesfully", data: newExpense });
};
exports.createExpenses = createExpenses;
