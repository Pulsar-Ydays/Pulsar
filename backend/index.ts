import dotenv from "dotenv";
import { connectDB } from "./connect_db";
import express from "express";
import routerUser from "./routes/user";
import routerTransac from "./routes/transac";
import routerWallet from "./routes/wallet";
import routerMarket from "./routes/market";
import { setupSwagger } from "./swagger";

dotenv.config();

connectDB(process.env.MONGODB_URL!).then();
const app = express();

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
