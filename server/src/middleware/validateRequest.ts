import { NextFunction, Request, RequestHandler, Response } from "express";
import {  ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ errors: err.errors });
    }
  };
};
