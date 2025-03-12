import mongoose from 'mongoose';
import cryptoSchema from "../schema/cryptoSchema";

// Create the Transaction model based on the schema
const cryptoModel = mongoose.model('Cryptomonnaie', cryptoSchema,'Cryptomonnaies');

export default cryptoModel;