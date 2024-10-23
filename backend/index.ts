import dotenv from "dotenv";
import {createUser} from "./createUser.ts";
import {deleteUser} from "./deleteUser.ts";
import './userType.ts'
import UserData from "./userType.ts";
import {connectDB} from "./connect_db.ts";
dotenv.config();

connectDB(process.env.MONGODB_URL!)
const sampleUser : UserData = {
    username: "johndoe",            // A unique username
    password: "password123",         // Plain text password (will be hashed before saving)
    email: "john.doe@example.com"    // A valid email address
};

const sampleUsername = "johndoe";

createUser(sampleUser);
//deleteUser(sampleUsername);

