import { Request, Response, Router, RequestHandler } from "express";
import {
  getCryptoData,
  getPriceBySlug,
} from "../services/coinMarketCapService";

const router = Router();

router.get("/api/crypto", (async (req: Request, res: Response) => {
  try {
    const data = await getCryptoData();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}) as RequestHandler);

router.get("/api/crypto/price", (async (req: Request, res: Response) => {
  const { slug } = req.query;

  if (typeof slug !== "string") {
    return res.status(400).json({ message: "Slug manquant ou invalide" });
  }

  try {
    const priceEur = await getPriceBySlug(slug);
    if (!priceEur) {
      return res.status(404).json({ message: "Crypto non trouvée" });
    }
    res.status(200).json({ priceEur });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
}) as RequestHandler);

export default router;
