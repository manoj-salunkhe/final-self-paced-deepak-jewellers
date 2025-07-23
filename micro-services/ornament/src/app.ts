import { errorHandler } from "@deepak-jewellers/common";
import express from "express";
import "express-async-errors";
import { createOrnamentRouter } from "./routes/create";

const app = express();
app.use(express.json());

// ROUTES
app.use(createOrnamentRouter);

app.use(errorHandler);

export { app };
