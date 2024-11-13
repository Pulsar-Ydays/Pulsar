import dotenv from "dotenv";
import express, { Request, Response } from 'express';
import {connectDB} from "./connect_db";
dotenv.config();
import router from "./routes/user";

connectDB(process.env.MONGODB_URL!).then();
const app = express();
app.use(express.json());
app.use(router);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});
app.listen(process.env.PORT,() => {
    console.log(`Server started on port ${process.env.PORT}`);
})

