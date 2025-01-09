import mongoose from 'mongoose';


const walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    transactionsId: {
        type: Array,
        required: false,
        default: []
    }}, { timestamps: true });


export default walletSchema;