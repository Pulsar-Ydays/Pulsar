import {getAllTransac} from "../API/transac/getAllTransac";
import {Router, Request, Response} from "express";
import {verifyToken} from "../middleware/authMiddleware";
import {getTransac} from "../API/transac/getTransac";
import {deleteTransac} from "../API/transac/deleteTransac";
import mongoose from "mongoose";
import {createTransac} from "../API/transac/createTransac";
import {updateTransac} from "../API/transac/updateTransac";

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
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(transac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/api/transactions/:id', verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const transacId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(transacId)) {
            return res.status(400).json({message: "Invalid transaction ID"});
        }

        const transac = await deleteTransac(req.params.id)
        if (!transac) {
            return res.status(404).json({message: "Transaction not found"});
        }
        res.status(200).json(transac);

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

router.post('/api/transactions', verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const transac = await createTransac(req.body);
        res.status(201).json(transac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/api/transactions/:id', verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const transacId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(transacId)) {
            return res.status(400).json({message: "Invalid transaction ID"});
        }

        const transac = await updateTransac(req.params.id, req.body)
        if (!transac) {
            return res.status(404).json({message: "Transaction not found"});
        }
        res.status(200).json(transac);

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export default router;
