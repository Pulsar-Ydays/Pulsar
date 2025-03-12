import mongoose from "mongoose";
import walletSchema from "../schema/walletSchema";

const walletModel = mongoose.model("Wallet", walletSchema, "Wallets");

export default walletModel;