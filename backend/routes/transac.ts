import {getAllTransac} from "../API/transac/getAllTransac";
import {Router, Request, Response} from "express";
import {verifyToken} from "../middleware/authMiddleware";
import {getTransac} from "../API/transac/getTransac";
import {deleteTransac} from "../API/transac/deleteTransac";
import mongoose from "mongoose";
import {createTransac} from "../API/transac/createTransac";
import {updateTransac} from "../API/transac/updateTransac";

const router = Router();



/**
 * @swagger
 * /api/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Récupère toutes les transactions
 *     description: Cette route permet de récupérer la liste complète des transactions.
 *     responses:
 *       200:
 *         description: Liste des transactions récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la transactions
 *                   userId:
 *                      type: string
 *                      description: ID de l'utilisateur
 *                   type:
 *                      type: string
 *                      description: Type de la transaction
 *                   amount:
 *                      type: number
 *                      description: Montant de la transaction
 *                   currency:
 *                      type: string
 *                      description: Devise de la transaction
 *                   quantity:
 *                      type: number
 *                      description: Quantité de la transaction
 *                   price:
 *                      type: number
 *                      description: Prix de la transaction
 *       500:
 *         description: Erreur serveur.
 */
router.get('/api/transactions', verifyToken, async (req: Request, res: Response) => {
    try {
        const allTransac = await getAllTransac();
        res.status(200).json(allTransac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Récupère toutes les transactions par ID
 *     description: Cette route permet de récupérer une transaction spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la transaction.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la transactions
 *                   userId:
 *                      type: string
 *                      description: ID de l'utilisateur
 *                   type:
 *                      type: string
 *                      description: Type de la transaction
 *                   amount:
 *                      type: number
 *                      description: Montant de la transaction
 *                   currency:
 *                      type: string
 *                      description: Devise de la transaction
 *                   quantity:
 *                      type: number
 *                      description: Quantité de la transaction
 *                   price:
 *                      type: number
 *                      description: Prix de la transaction
 *       404:
 *         description: Transaction non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
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


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Crée une nouvelle transaction
 *     description: Cette route permet de créer une nouvelle transaction avec les données fournies.
 *     responses:
 *       200:
 *         description: Transaction créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la transactions
 *                   userId:
 *                      type: string
 *                      description: ID de l'utilisateur
 *                   type:
 *                      type: string
 *                      description: Type de la transaction
 *                   amount:
 *                      type: number
 *                      description: Montant de la transaction
 *                   currency:
 *                      type: string
 *                      description: Devise de la transaction
 *                   quantity:
 *                      type: number
 *                      description: Quantité de la transaction
 *                   price:
 *                      type: number
 *                      description: Prix de la transaction
 *       201:
 *          description: Transaction créée avec succès.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/api/transactions', verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const transac = await createTransac(req.body);
        res.status(201).json(transac);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});



/**
 * @swagger
 * /api/transactions/{id}:
 *   patch:
 *     tags:
 *       - Transactions
 *     summary: Met à jour une transaction
 *     description: Cette route permet de mettre à jour une transaction spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la transaction.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la transactions
 *                   userId:
 *                      type: string
 *                      description: ID de l'utilisateur
 *                   type:
 *                      type: string
 *                      description: Type de la transaction
 *                   amount:
 *                      type: number
 *                      description: Montant de la transaction
 *                   currency:
 *                      type: string
 *                      description: Devise de la transaction
 *                   quantity:
 *                      type: number
 *                      description: Quantité de la transaction
 *                   price:
 *                      type: number
 *                      description: Prix de la transaction
 *       404:
 *         description: Transaction non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
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


/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Supprime une transaction
 *     description: Cette route permet de supprimer une transaction spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la transaction.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction trouvée.
 *       400:
 *          description: ID transaction invalide.
 *       404:
 *         description: Transaction non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
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

export default router;
