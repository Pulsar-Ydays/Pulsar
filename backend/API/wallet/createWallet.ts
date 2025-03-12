import WalletData from "../../Type/walletType";
import Wallet from "../../model/walletModel";
import User from "../../model/userModel";

export async function createWallet(walletData: WalletData): Promise<WalletData> {
    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findById(walletData.userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Créer et sauvegarder le wallet
        const newWallet = new Wallet(walletData);
        const savedWallet = await newWallet.save();

        // Ajouter l'ID du wallet à l'utilisateur
        await User.findByIdAndUpdate(walletData.userId, {
            $push: { wallets: savedWallet._id }
        });

        console.log("Wallet saved successfully:", savedWallet);
        return savedWallet;
    } catch (error) {
        console.error("Error creating wallet:", error);
        throw new Error("Failed to create wallet");
    }
}
