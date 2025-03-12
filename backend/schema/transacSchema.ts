import mongoose from 'mongoose';

const transacSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    type: {
        type: String,
        enum: ['buy', 'sell', 'deposit', 'withdraw'],
        required: true
    },
    symbol: {
        type: String,
        id: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: { // Prix unitaire lors de la transaction
        type: Number,
        required: true
    },
    totalValue: {
        type: Number,
        required: true
    },
    fee: {  // Frais de transaction (optionnel)
        type: Number,
        default: 0
    },
    exchange: {
        type: String,
        default: 'Unknown'
    }
}, { timestamps: true });

export default transacSchema;
