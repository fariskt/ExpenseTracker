import { Request, Response } from "express";
import { AuthRequest } from "../types";
import prisma from "../config/db";

export const getUserGoals = async (req: Request, res: Response) => {
  const { userId } = (req as AuthRequest).user;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const goals = await prisma.goal.findMany({ where: { userId } });
  if (!goals) {
    return res.status(404).json({ message: "Goals not found" });
  }
  return res.status(200).json({ message: "Goals fetched successfully", goals });
};

export const createGoals = async (req: Request, res: Response) => {
  const { deadline, ...rest } = req.body;

  const { userId } = (req as AuthRequest).user;
  if (!deadline) {
    return res.status(404).json({ message: "Please provide a deadline" });
  }

  const newGoal = await prisma.goal.create({
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

export const deleteGoal = async (req: Request, res: Response) => {
  const { goalId } = req.params;
  if (!goalId) {
    return res.status(404).json({ message: "Goal not found" });
  }
  await prisma.goal.delete({ where: { id: goalId } });
  return res.status(201).json({ message: "Goal deleted successfully" });
};

export const updateGoal = async (req: Request, res: Response) => {
  const { goalId } = req.params;
  if (!goalId) {
    return res.status(404).json({ message: "Goal not found" });
  }
  const { name, target, saved, deadline } = req.body;

  const existingGoal = await prisma.goal.findUnique({
    where: { id: goalId },
  });

  if (!existingGoal) {
    return res.status(404).json({ message: "Goal not found" });
  }

  const updatedGoal = await prisma.goal.update({
    where: { id: goalId },
    data: {
      name,
      target,
      saved,
      deadline,
    },
  });

  return res.status(200).json({
    message: "Goal updated successfully",
    expense: updatedGoal,
  });
};
