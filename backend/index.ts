import dotenv from "dotenv";
import {createUser} from "./createUser";
import {deleteUser} from "./deleteUser";
import {updateUser} from "./updateUser";
import express, { Request, Response } from 'express';
import UserData from "./userType";
import {connectDB} from "./connect_db";
dotenv.config();
import {getAllUsers} from "./getUser";

connectDB(process.env.MONGODB_URL!).then();
const app = express();
const router = express.Router();
app.use(express.json());
app.use(router);
router.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers(); // Utilisation de votre fonction pour récupérer les utilisateurs
        res.status(200).json(users); // Envoie les utilisateurs dans la réponse HTTP sous forme de JSON
    } catch (error : any) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
    }
});
app.post('/api/users', createUser);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});
app.listen(process.env.PORT,() => {
    console.log(`Server started on port ${process.env.PORT}`);
})

