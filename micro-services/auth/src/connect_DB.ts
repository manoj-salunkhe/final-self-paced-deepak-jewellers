import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const db_user = process.env.DB_USER;
const db_password = encodeURIComponent(process.env.DB_PASSWORD || "");
const uri = `mongodb+srv://${db_user}:${db_password}@deepak-jewellers-cluste.0szlj3.mongodb.net/?retryWrites=true&w=majority&appName=deepak-jewellers-cluster-0`;

const connect_DB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected with Mongoose");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    // process.exit(1); // Exit on failure
  }
};

export default connect_DB;
