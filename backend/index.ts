import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./connect_db";
import routerMarket from "./routes/market";
import routerTransac from "./routes/transac";
import routerUser from "./routes/user";
import routerWallet from "./routes/wallet";
import { setupSwagger } from "./swagger";

dotenv.config();

connectDB(process.env.MONGODB_URL!).then();
const app = express();

// Configuration de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3001",
  méthode: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routerUser);
app.use(routerTransac);
app.use(routerWallet);
app.use(routerMarket);

// Configuration de Swagger
setupSwagger(app);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
