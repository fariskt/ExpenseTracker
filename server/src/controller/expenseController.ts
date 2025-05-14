import { Request, Response } from "express";
import { AuthRequest } from "../types";
import prisma from "../config/db";

export const getUserExpenses = async (req: Request, res: Response) => {
  const { userId } = (req as AuthRequest).user;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const expenses = await prisma.expenses.findMany({ where: { userId } });
  if (!expenses) {
    return res.status(404).json({ message: "Expense not found" });
  }
  return res
    .status(200)
    .json({ message: "Expenses fetched successfully", expenses });
};

export const createExpenses = async (req: Request, res: Response) => {
  const expenses = req.body;

  const {userId} = (req as AuthRequest).user
  if (!expenses) {
    return res.status(404).json({ message: "Please fill the field" });
  }

  const newExpense= await prisma.expenses.create({data: {
    userId,
    amount: Number(expenses.amount) || 0,
    category: expenses.category,
    description: expenses.description,
    date: new Date(),
    subject:expenses.subject
  }})

  return res.status(201).json({message: "Expense created succesfully", data: newExpense})
};
