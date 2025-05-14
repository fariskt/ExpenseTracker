import jwt from "jsonwebtoken";

export function generateToken(user: { id: string}) {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" });
}
