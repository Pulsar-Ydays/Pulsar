import {Request, Response, Router} from 'express';
import {createUser} from "../createUser";
import {getAllUsers} from "../getUser";


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

export default router;
