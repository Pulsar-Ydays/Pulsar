import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getCryptoData } from "../services/coinMarketCapService";

const router = Router();

router.get('/api/crypto', async (req: Request, res: Response) => {
    try {
        const data = await getCryptoData();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
