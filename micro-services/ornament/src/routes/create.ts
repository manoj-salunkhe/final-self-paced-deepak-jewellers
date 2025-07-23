import { validateRequest } from "@deepak-jewellers/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import Ornament from "../models/ornament";
import { Material } from "../types";

const MATERIAL_VALUES = Object.values(Material);

const createOrnamentRouter = express.Router();

createOrnamentRouter.post(
  "/api/ornaments/create",
  [
    body("name").isString().withMessage("Name is required"),
    body("weight")
      .isFloat({ gt: 0 })
      .withMessage("Weight must be a number greater than 0"),
    body("material")
      .isIn(MATERIAL_VALUES)
      .withMessage(`Material must be one of: ${MATERIAL_VALUES.join(", ")}`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, weight, material } = req.body;

    const ornament = await Ornament.find({});
    console.log("All ornament", ornament);

    res.status(201).send({});
  }
);

export { createOrnamentRouter };
