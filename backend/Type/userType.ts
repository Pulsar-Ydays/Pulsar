import {ObjectId} from "mongodb";

export default interface UserData {
    _id: ObjectId;
    username: string;
    password: string;
    email: string;
    walletId: Array<any>;
}