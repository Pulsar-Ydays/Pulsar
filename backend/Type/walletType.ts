import { Types } from "mongoose";
import TransacData from "./transacType"
import CryptoData from "./cryptoType"

export default interface WalletData {
    _id?: Types.ObjectId; // ID du portefeuille (optionnel pour la création)
    name: string;
    userId: Types.ObjectId; // Référence à l'utilisateur
    transactions?: TransacData[]; // Liste des transactions
    holdings?: CryptoData[]; // Liste des cryptos détenues
    totalValue?: number; // Valeur totale du portefeuille
    createdAt?: Date;
    updatedAt?: Date;
}
