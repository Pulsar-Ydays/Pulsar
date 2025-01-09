import WalletData from "../../Type/walletType";
import Wallet from "../../model/walletModel";

export async function createWallet(walletData: WalletData): Promise<WalletData> {
    try {
        const newWallet = new Wallet(walletData);
        const savedWallet = await newWallet.save();

        console.log("wallet saved successfully:", savedWallet);
        return savedWallet;
    } catch (error) {
        console.error("Error creating wallet:", error);
        throw error;
    }
}