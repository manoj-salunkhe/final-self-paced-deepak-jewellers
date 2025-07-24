import { errorHandler } from "@deepak-jewellers/common";
import express from "express";
import "express-async-errors";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());

app.use(signupRouter);

app.use(errorHandler);

export { app };
