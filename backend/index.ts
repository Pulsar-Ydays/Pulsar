import dotenv from "dotenv";
import {createUser} from "./createUser.ts";
import {deleteUser} from "./deleteUser.ts";
import {updateUser} from "./updateUser.ts";
import './userType.ts'
import UserData from "./userType.ts";
import {connectDB} from "./connect_db.ts";
dotenv.config();

connectDB(process.env.MONGODB_URL!)
const sampleUser : UserData = {
    username: "john",            // A unique username
    password: "password123",         // Plain text password (will be hashed before saving)
    email: "john.doe@example.com"    // A valid email address
};

const sampleUsername = "johndoe";
const samplePassword = {password: "password553"};

createUser(sampleUser);
//deleteUser(sampleUsername);
//pdateUser("johndoe", samplePassword);

