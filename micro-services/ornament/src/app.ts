import { currentUser, errorHandler } from "@deepak-jewellers/common";
import express from "express";
import "express-async-errors";
import { createOrnamentRouter } from "./routes/create";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test", // Use secure cookies in production
    secure: false, // For testing purposes, set to false
  })
);

app.use(currentUser);

// ROUTES
app.use(createOrnamentRouter);

app.use(errorHandler);

export { app };
