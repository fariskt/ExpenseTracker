import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../types";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (userExist) {
    return res.status(404).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.password) {
    return res.status(404).json({ message: "NO password set for this user" });
  }

  const ismatch = bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const accessToken = generateToken({ id: user.id });

 res.cookie("token", accessToken, {
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only true in production
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'lax' is safer for dev
});


  return res.json(user);
};

export const getUserData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = (req as AuthRequest).user;
  if (!userId) {
    return res.status(404).json({ message: "Userid not found" });
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return res
    .status(200)
    .json({ message: "User data fetched successfully", user });
};
