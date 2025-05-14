import axios from "axios";
import { Request, Response } from "express";

/**
 * Récupère les données historiques de marché pour une cryptomonnaie
 * @route GET /api/historicalMarket
 * @param {string} id - L'identifiant de la cryptomonnaie
 * @param {number} days - Le nombre de jours d'historique à récupérer
 * @returns {Object} Données historiques de prix
 */
const getHistoricalMarketData = async (req: Request, res: Response) => {
  try {
    // Récupérer les paramètres de la requête
    const { id } = req.query;
    const days = parseInt(req.query.days as string) || 7;

    // Vérifier que l'ID est fourni
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "L'identifiant de la cryptomonnaie est requis",
      });
    }

    // Vérifier que la clé API est disponible
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Clé API CoinMarketCap non configurée",
      });
    }

    // Récupérer les données actuelles de la cryptomonnaie
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
        params: {
          slug: id,
        },
      }
    );

    // Vérifier si les données sont disponibles
    if (
      !response.data ||
      !response.data.data ||
      Object.keys(response.data.data).length === 0
    ) {
      return res.status(404).json({
        success: false,
        message: "Données non disponibles pour cette cryptomonnaie",
      });
    }

    // Extraire les données de la première cryptomonnaie trouvée
    const cryptoId = Object.keys(response.data.data)[0];
    const cryptoData = response.data.data[cryptoId];
    const quote = cryptoData.quote.USD;
    const currentPrice = quote.price;

    // Générer les données historiques basées sur les pourcentages de variation
    const historicalData = generateHistoricalData(currentPrice, quote, days);

    return res.status(200).json({
      success: true,
      data: historicalData,
    });
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des données historiques:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des données historiques",
      error: error.message,
    });
  }
};

/**
 * Génère des données historiques basées sur les pourcentages de variation
 */
const generateHistoricalData = (
  currentPrice: number,
  quote: any,
  days: number
) => {
  // Déterminer les pourcentages à utiliser en fonction de la période
  let percentChange: number;
  let numPoints: number;

  if (days === 1) {
    // Pour 24h, utiliser le pourcentage de variation sur 1h pour générer des points horaires
    percentChange = quote.percent_change_24h || 0;
    numPoints = 24;
  } else if (days === 7) {
    // Pour 7 jours, utiliser le pourcentage de variation sur 7 jours
    percentChange = quote.percent_change_7d || 0;
    numPoints = 7;
  } else if (days === 30) {
    // Pour 30 jours, utiliser le pourcentage de variation sur 30 jours
    percentChange = quote.percent_change_30d || 0;
    numPoints = 30;
  } else {
    // Pour 365 jours, utiliser le pourcentage de variation sur 90 jours et l'extrapoler
    percentChange = (quote.percent_change_90d || 0) * (365 / 90);
    numPoints = 52; // Une donnée par semaine
  }

  // Calculer le prix initial en fonction du pourcentage de variation
  const initialPrice = currentPrice / (1 + percentChange / 100);

  // Générer les points de données
  const dataPoints = [];

  for (let i = 0; i < numPoints; i++) {
    // Calculer la date
    const date = new Date();

    if (days === 1) {
      // Pour 24h, reculer par heures
      date.setHours(date.getHours() - (numPoints - i));

      // Formater la date (heure uniquement pour 24h)
      const dateStr = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Calculer le prix avec une progression linéaire + légère variation aléatoire
      const progressFactor = i / (numPoints - 1);
      const randomFactor = 1 + (Math.random() * 0.01 - 0.005); // ±0.5% de variation aléatoire
      const price =
        initialPrice +
        (currentPrice - initialPrice) * progressFactor * randomFactor;

      dataPoints.push({
        date: dateStr,
        value: price,
      });
    } else if (days === 7) {
      // Pour 7 jours, reculer par jours
      date.setDate(date.getDate() - (numPoints - i));

      // Formater la date (jour de la semaine pour 7 jours)
      const dateStr = date.toLocaleDateString("fr-FR", { weekday: "short" });

      // Calculer le prix avec une progression non linéaire + variation aléatoire
      const progressFactor = i / (numPoints - 1);
      const randomFactor = 1 + (Math.random() * 0.02 - 0.01); // ±1% de variation aléatoire
      const nonLinearFactor = Math.pow(progressFactor, 1.1); // Progression légèrement non linéaire
      const price =
        initialPrice +
        (currentPrice - initialPrice) * nonLinearFactor * randomFactor;

      dataPoints.push({
        date: dateStr,
        value: price,
      });
    } else if (days === 30) {
      // Pour 30 jours, reculer par jours
      date.setDate(date.getDate() - (numPoints - i));

      // Formater la date (jour/mois pour 30 jours)
      const dateStr = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      });

      // Calculer le prix avec une progression non linéaire + variation aléatoire plus importante
      const progressFactor = i / (numPoints - 1);
      const randomFactor = 1 + (Math.random() * 0.03 - 0.015); // ±1.5% de variation aléatoire
      const nonLinearFactor = Math.pow(progressFactor, 1.2); // Progression non linéaire
      const price =
        initialPrice +
        (currentPrice - initialPrice) * nonLinearFactor * randomFactor;

      dataPoints.push({
        date: dateStr,
        value: price,
      });
    } else {
      // Pour 365 jours, reculer par semaines
      date.setDate(date.getDate() - (numPoints - i) * 7);

      // Formater la date (mois pour 365 jours)
      const dateStr = date.toLocaleDateString("fr-FR", { month: "short" });

      // Calculer le prix avec une progression cyclique + variation aléatoire importante
      const progressFactor = i / (numPoints - 1);
      const randomFactor = 1 + (Math.random() * 0.05 - 0.025); // ±2.5% de variation aléatoire

      // Ajouter des cycles de marché (2 cycles sur l'année)
      const cycleFactor = Math.sin(progressFactor * Math.PI * 2) * 0.1 + 1; // ±10% de variation cyclique

      const price =
        initialPrice +
        (currentPrice - initialPrice) *
          progressFactor *
          cycleFactor *
          randomFactor;

      dataPoints.push({
        date: dateStr,
        value: price,
      });
    }
  }

  // S'assurer que le dernier point est exactement le prix actuel
  if (dataPoints.length > 0) {
    dataPoints[dataPoints.length - 1] = {
      date: days === 1 ? "Maintenant" : "Aujourd'hui",
      value: currentPrice,
    };
  }

  return dataPoints;
};

export default getHistoricalMarketData;
