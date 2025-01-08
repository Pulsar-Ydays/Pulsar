import {getAllTransac} from "../API/transac/getAllTransac";
import {Router, Request, Response} from "express";
import {verifyToken} from "../middleware/authMiddleware";
import {getTransac} from "../API/transac/getTransac";

const router = Router();

router.get('/api/transactions', verifyToken, async (req: Request, res: Response) => {
    try {
        const allTransac = await getAllTransac();
        res.status(200).json(allTransac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

router.get('/api/transactions/:id', verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const transac = await getTransac(req.params.id);
        if (!transac) {
            return res.status(404).json({ message: "Transac not found" });
        }
        res.status(200).json(transac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export default router;
