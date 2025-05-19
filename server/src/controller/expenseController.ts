import { Request, Response } from "express";
import { AuthRequest } from "../types";
import prisma from "../config/db";

export const getUserExpenses = async (req: Request, res: Response) => {
  const { userId } = (req as AuthRequest).user;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const expenses = await prisma.expense.findMany({ where: { userId }, orderBy: {date : "desc"} });
  if (!expenses) {
    return res.status(404).json({ message: "Expense not found" });
  }
  return res
    .status(200)
    .json({ message: "Expenses fetched successfully", expenses });
};

export const createExpenses = async (req: Request, res: Response) => {
  const expenses = req.body;

  const { userId } = (req as AuthRequest).user;
  if (!expenses) {
    return res.status(404).json({ message: "Please fill the field" });
  }

  const newExpense = await prisma.expense.create({
    data: {
      userId,
      amount: Number(expenses.amount) || 0,
      category: expenses.category,
      description: expenses.description,
      date: new Date(),
      subject: expenses.subject,
    },
  });

  return res
    .status(201)
    .json({ message: "Expense created succesfully", data: newExpense });
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;
  if (!expenseId) {
    return res.status(404).json({ message: "Expense not found" });
  }
  await prisma.expense.delete({ where: { id: expenseId } });
  return res.status(201).json({ message: "Expense deleted successfully" });
};

export const updateExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;
  if (!expenseId) {
    return res.status(404).json({ message: "Expense not found" });
  }
  const { amount, category, description, date, subject } = req.body;

  const existingExpense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });

  if (!existingExpense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  const updatedExpense = await prisma.expense.update({
    where: { id: expenseId },
    data: {
      amount,
      category,
      description,
      date,
      subject,
    },
  });

  return res.status(200).json({
    message: "Expense updated successfully",
    expense: updatedExpense,
  });
};


export const deleteSelectedExpenses = async (req: Request, res: Response) => {
  const expenseIds = req.body;
  console.log(req.body);
  
  if (!expenseIds || expenseIds.length === 0) {
    return res.status(404).json({ message: "Please Provide expenses to delete" });
  }
  const selectedIdToDelete = await prisma.expense.deleteMany({
    where: { id: { in: expenseIds } },
  });
  return res.status(200).json({
    message: "Selected expenses deleted!",
    count: selectedIdToDelete.count,
  });
};
