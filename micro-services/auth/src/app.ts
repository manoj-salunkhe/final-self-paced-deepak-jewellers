import { errorHandler } from "@deepak-jewellers/common";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { COOKIE_SESSION_EXPIRATION } from "./contants";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/sigin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // only this domain can make requests, only for development
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test", // Use secure cookies in production
    secure: false, // For testing purposes, set to false
    maxAge: COOKIE_SESSION_EXPIRATION, // one exipred, it will be removed from the browser
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

export { app };
