var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/db";
export const getUserExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const expenses = yield prisma.expense.findMany({ where: { userId } });
    if (!expenses) {
        return res.status(404).json({ message: "Expense not found" });
    }
    return res
        .status(200)
        .json({ message: "Expenses fetched successfully", expenses });
});
export const createExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = req.body;
    const { userId } = req.user;
    if (!expenses) {
        return res.status(404).json({ message: "Please fill the field" });
    }
    const newExpense = yield prisma.expense.create({ data: {
            userId,
            amount: Number(expenses.amount) || 0,
            category: expenses.category,
            description: expenses.description,
            date: new Date(),
            subject: expenses.subject
        } });
    return res.status(201).json({ message: "Expense created succesfully", data: newExpense });
});
