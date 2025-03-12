import { Types } from "mongoose";

export default interface TransacData {
    userId: Types.ObjectId;  // Référence à l'utilisateur
    walletId: Types.ObjectId; // Référence au portefeuille
    type: 'buy' | 'sell' | 'deposit' | 'withdraw'; // Enum pour limiter les valeurs possibles
    symbol: string;  // Symbole de la crypto (ex: BTC, ETH)
    quantity: number; // Quantité échangée
    price: number; // Prix unitaire lors de la transaction
    totalValue: number; // Valeur totale (quantity * price)
    fee?: number; // Frais de transaction (optionnel)
    exchange?: string; // Exchange utilisé (par défaut "Unknown")
    createdAt?: Date; // Ajout des timestamps
    updatedAt?: Date;
}
