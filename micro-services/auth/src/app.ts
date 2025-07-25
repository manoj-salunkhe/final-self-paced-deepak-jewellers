import { errorHandler } from "@deepak-jewellers/common";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/sigin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test", // Use secure cookies in production
    secure: false, // For testing purposes, set to false
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

export { app };
