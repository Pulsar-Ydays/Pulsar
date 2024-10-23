import dotenv from "dotenv";
import {createUser} from "./createUser.ts";
import './userType.ts'
import UserData from "./userType.ts";
dotenv.config();

const sampleUser : UserData = {
    username: "johndoe",            // A unique username
    password: "password123",         // Plain text password (will be hashed before saving)
    email: "john.doe@example.com"    // A valid email address
};

createUser(sampleUser);
