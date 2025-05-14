import {Types} from "mongoose";

export default interface CryptoData {
    _id?: Types.ObjectId;
    id_api:number
    symbol: string; // Symbole de la crypto (ex: BTC, ETH)
    amount: number; // Quantité détenue
    averageBuyPrice: number; // Prix moyen d'achat
    createdAt?: Date;
    updatedAt?: Date;
}
