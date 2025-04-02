import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    id_api: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    averageBuyPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

export default cryptoSchema;