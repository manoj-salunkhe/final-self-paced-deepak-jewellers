import { BadRequestError, validateRequest } from "@deepak-jewellers/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const userValidations = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const signupRouter = express.Router();

signupRouter.post(
  "/api/signup",
  userValidations,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SCERET!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({ ...user.toJSON(), jwt: userJwt });
  }
);

export { signupRouter };
