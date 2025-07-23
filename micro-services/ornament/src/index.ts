import connect_DB from "./connect_DB";
import { app } from "./app";

const PORT = 2100;

const start = async () => {
  try {
    console.log("In start try block :");
    await connect_DB();
  } catch (err) {
    console.log("In start catch block :", err);
  }

  app.listen(PORT, () => {
    console.log("Deepak Jeweller Ornument app listening on port " + PORT);
  });
};

start();
