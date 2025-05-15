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
