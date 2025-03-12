import {Router, Request, Response} from "express";
import {verifyToken} from "../middleware/authMiddleware";
import mongoose from "mongoose";
import {createWallet} from "../API/wallet/createWallet";
import {getAllWallet} from "../API/wallet/getAllWallet";

const router = Router();

router.post('/api/wallets/:userId', verifyToken, async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;

        const walletData = { ...req.body, userId };

        const newWallet = await createWallet(walletData);
        res.status(201).json(newWallet);
    } catch (error: any) {
        console.error("Error creating wallet:", error);
        res.status(500).json({ message: "Error creating the Wallet" });
    }
});


router.get('/api/wallets/userId', verifyToken, async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;

        const allWallet = await getAllWallet(userId);
        res.status(200).json(allWallet);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;