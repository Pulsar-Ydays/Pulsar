import {Router, Request, Response} from "express";
import {verifyToken} from "../middleware/authMiddleware";
import mongoose from "mongoose";
import {createWallet} from "../API/wallet/createWallet";
import {getAllWallet} from "../API/wallet/getAllWallet";

const router = Router();

router.post('/api/wallets', verifyToken, async (req: Request, res: Response) => {
    try {
        const newTransac = await createWallet(req.body);
        res.status(201).json(newTransac);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating transaction' });
    }
});

router.get('/api/wallets', verifyToken, async (req: Request, res: Response) => {
    try {
        const allWallet = await getAllWallet();
        res.status(200).json(allWallet);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;