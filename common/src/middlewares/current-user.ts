import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";

// Load root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SCERET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {
    console.log("currentUser error", error);
  }
  next();
};
