import {Request, Response, Router} from 'express';
import {createUser} from "../API/user/createUser";
import {getAllUsers} from "../API/user/getAllUser";
import {updateUser} from "../API/user/updateUser";
import {deleteUser} from "../API/user/deleteUser";
import mongoose from "mongoose";
import {getUser} from "../API/user/getUser";
import bcrypt from "bcrypt";
import User from "../model/userModel"
import jwt from "jsonwebtoken";
import {verifyToken} from "../middleware/authMiddleware";
import {createWallet} from "../API/wallet/createWallet";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupère tous les utilisateurs
 *     description: Cette route permet de récupérer la liste complète des utilisateurs.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de l'utilisateur
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur
 *                   email:
 *                     type: string
 *                     description: Adresse email
 *       500:
 *         description: Erreur serveur.
 */
router.get('/api/users', verifyToken, async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers(); // Utilisation de votre fonction pour récupérer les utilisateurs
        res.status(200).json(users); // Envoie les utilisateurs dans la réponse HTTP sous forme de JSON
    } catch (error : any) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupère un utilisateur par ID
 *     description: Cette route permet de récupérer un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de l'utilisateur
 *                 username:
 *                   type: string
 *                   description: Nom d'utilisateur
 *                 email:
 *                   type: string
 *                   description: Adresse email
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/api/users/:id',  verifyToken, async (req: Request, res: Response): Promise<any | Record<string, any>> => {
    try {
        const user = await getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crée un nouvel utilisateur
 *     description: Cette route permet de créer un nouvel utilisateur avec les données fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse email
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/api/users', async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        const createdWallet = await createWallet({userId: user._id.toString(), name: "Default Wallet"});
        console.log("Wallet created", createdWallet);
        res.status(201).json(user);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Met à jour un utilisateur
 *     description: Met à jour les informations d'un utilisateur existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur (au moins 3 caractères)
 *               email:
 *                 type: string
 *                 description: Adresse email
 *               password:
 *                 type: string
 *                 description: Mot de passe (au moins 6 caractères)
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Requête invalide (validation échouée).
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.patch('/api/users/:id',verifyToken,  async (req: Request, res: Response) : Promise<any | Record<string, any>> => {
    try {
        const { username, password, email } = req.body;
        if (username && username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters" });
        }
        if (password && password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (email && !email.match(/\S+@\S+.\S+/)) {
            return res.status(400).json({ message: "Email is invalid" });
        }
        const user = await updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
        return user;
    }
    catch (error : any) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       400:
 *         description: ID utilisateur invalide.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.delete('/api/users/:id', verifyToken,  async (req: Request, res: Response) : Promise<any | Record<string, any>> => {
    try {
        // Assurez-vous que l'ID est une chaîne
        const userId: string = req.params.id;

        // Vérification de la validité de l'ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await deleteUser(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User successfully deleted", user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authentifie un utilisateur
 *     description: Permet à un utilisateur de se connecter avec un nom d'utilisateur et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *       401:
 *         description: Échec de l'authentification.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/login', async (req: Request, res: Response) : Promise<any>  => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});




export default router;
