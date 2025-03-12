import mongoose from 'mongoose';
import transacSchema from "./transacSchema";
import cryptoSchema from "./cryptoSchema";


const walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactions: [transacSchema], // Stockage des transactions en sous-document
    holdings: [cryptoSchema], // Liste des cryptos détenues
    totalValue: { // Valeur totale du portefeuille
        type: Number,
        default: 0
    }
}, { timestamps: true });


export default walletSchema;