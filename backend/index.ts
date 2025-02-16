import dotenv from "dotenv";
import { connectDB } from "./connect_db";
import express from "express";
import routerUser from "./routes/user";
import routerTransac from "./routes/transac";
import { setupSwagger } from "./swagger";
import cors from "cors";
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
