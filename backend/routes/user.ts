import {Request, Response, Router} from 'express';
import {createUser} from "../API/createUser";
import {getAllUsers} from "../API/getAllUser";
import {updateUser} from "../API/updateUser";
import userSchema from "../schema/userSchema";
import {deleteUser} from "../API/deleteUser";
import UserData from "../userType";
import mongoose from "mongoose";


const router = Router();

router.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers(); // Utilisation de votre fonction pour récupérer les utilisateurs
        res.status(200).json(users); // Envoie les utilisateurs dans la réponse HTTP sous forme de JSON
    } catch (error : any) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
    }
});

router.post('/api/users', async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/api/users/:id', async (req: Request, res: Response) : Promise<any | Record<string, any>> => {
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

router.delete('/api/users/:id', async (req: Request, res: Response) : Promise<any | Record<string, any>> => {
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



export default router;
