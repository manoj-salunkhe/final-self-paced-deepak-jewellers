import { currentUser } from "@deepak-jewellers/common";
import express, { Request, Response } from "express";

export const currentUserRouter = express.Router();

currentUserRouter.get(
  "/api/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);
