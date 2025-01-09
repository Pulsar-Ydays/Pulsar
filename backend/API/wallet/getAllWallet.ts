import WalletData from "../../Type/walletType";
import Wallet from "../../model/walletModel";

export async function getAllWallet(): Promise<WalletData[]> {
    try {
        const allWallet  = await Wallet.find().exec(); // Attente de la promesse
        if (!allWallet || allWallet.length === 0) {
            throw new Error("No wallet found");
        } else {
            console.log(allWallet);
        }
        return allWallet
    } catch (error) {
        console.error("Error fetching wallet:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}


