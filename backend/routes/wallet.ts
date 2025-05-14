import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import mongoose from "mongoose";
import { createWallet } from "../API/wallet/createWallet";
import { getAllWallet } from "../API/wallet/getAllWallet";

const router = Router();

router.post(
  "/api/wallets/:userId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userId;

      const walletData = { ...req.body, userId };

      const newWallet = await createWallet(walletData);
      res.status(201).json(newWallet);
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      res.status(500).json({ message: "Error creating the Wallet" });
    }
  }
);

router.get(
  "/api/wallets/:userId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userId;

      const allWallet = await getAllWallet(userId);
      res.status(200).json(allWallet);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/api/wallets/:walletId/transactions",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const walletId = req.params.walletId;

      const wallet = await mongoose
        .model("Wallet")
        .findById(walletId)
        .populate({
          path: "transactions",
          options: { sort: { createdAt: -1 } }, // 🔁 tri par date décroissante
        });

      if (!wallet) {
        res.status(404).json({ message: "Wallet non trouvé" });
        return;
      }

      res.status(200).json(wallet.transactions);
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération des transactions du wallet :",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
