import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user: {
    userId: string;
  };
}

export const isAuthenticate = (
  req: Request, // 👈 use standard Request here
  res: Response,
  next: NextFunction
):void => {
  const token = req.cookies.token;
  console.log("eee" ,token);
  
  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return 
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
console.log("ishannnnn ",decoded);

    if (typeof decoded === "string" || !decoded.id) {
       res.status(401).json({ message: "Invalid token payload" });
       return
    }

    // 👇 type assertion here to assign custom property
    (req as AuthRequest).user = { userId: decoded.id };
    next();
  } catch (err) {
     res.status(401).json({ message: `Invalid or expired token`, error: err });
     return
  }
};
