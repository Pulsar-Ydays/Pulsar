import { connectDB } from "./connect_db.js";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MANGO_URL;

connectDB(connectionString);
