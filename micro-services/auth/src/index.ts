import { app } from "./app";
import connect_DB from "./connect_DB";

const PORT = 2200;

const start = async () => {
  try {
    console.log("In start try block :");
    if (!process.env.JWT_SCERET) {
      throw new Error("JWT_KEY must be defined");
    }
    await connect_DB();
  } catch (err) {
    console.log("In start catch block :", err);
  }

  app.listen(PORT, () => {
    console.log("Deepak Jeweller auth app listening on port " + PORT);
  });
};

start();
