import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcryptjs";

export const createUser = async (req:Request, res:Response) => {
  const { name, email, password } = req.body;

  const userExist = await prisma.user.findUnique({
    where: {email}
  })
   
  if(userExist){
    return res.status(404).json({message: "User already exists"})
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data:{ name, email, password: hashedPassword } 
  });

   return res.status(201).json(user);
  }

export const loginUser = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where:{ email}
    })
    
    if(!user){
      return res.status(404).json({message: "Invalid credentials"})
    }
    if(!user.password){
      return res.status(404).json({message: "NO password set for this user"})

    }

    const ismatch= bcrypt.compare(password, user.password)
    if(!ismatch){
      return res.status(401).json({message: "Incorrect Password"})
    }

    return res.json(user);
  }