import { BadRequestError, validateRequest } from "@deepak-jewellers/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { JWT_SECRET_EXPIRATION } from "../contants";
import { User } from "../models/user";
import { Password } from "../services/password";

const userValidations = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

const signinRouter = express.Router();

signinRouter.post(
  "/api/signin",
  userValidations,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SCERET!,
      {
        expiresIn: JWT_SECRET_EXPIRATION,
      }
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({ ...existingUser.toJSON(), jwt: userJwt });
  }
);

export { signinRouter };
