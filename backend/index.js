import { connectDB } from "./connect_db.js";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGO_URL;

connectDB(connectionString).then(r => {
    console.log("Connected to MongoDB");
});
