import WalletData from "../../Type/walletType";
import Wallet from "../../model/walletModel";
import User from "../../model/userModel";

export async function getAllWallet(userId: string): Promise<WalletData[]> {
    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Récupérer les wallets associés à cet utilisateur
        const userWallets = await Wallet.find({ userId }).exec();

        console.log("User wallets:", userWallets);
        return userWallets;
    } catch (error) {
        console.error("Error fetching wallets:", error);
        throw error;
    }
}
