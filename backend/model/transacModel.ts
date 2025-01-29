import mongoose from 'mongoose';
import transacSchema from '../schema/transacSchema';

// Create the Transaction model based on the schema
const transacModel = mongoose.model('Transaction', transacSchema,'Transactions');

export default transacModel;