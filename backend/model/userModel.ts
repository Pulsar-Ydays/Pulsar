import mongoose from 'mongoose';
import userSchema from '../schema/userSchema';

// Create the User model based on the schema
const userModel = mongoose.model('User', userSchema,'Users');

export default userModel;