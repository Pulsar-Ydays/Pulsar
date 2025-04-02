"use client";

import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";
import priceMarket from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface CryptoArticle {
  title: string;
  url: string;
  published_at: string;
  source: {
    domain: string;
  };
}

interface CryptoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  // Ajout des pourcentages de variation supplémentaires
  percent_change_1h?: number;
  percent_change_7d?: number;
  percent_change_30d?: number;
  percent_change_60d?: number;
  percent_change_90d?: number;
  // Ajout de données historiques pour le graphique
  price_history?: {
    "1h": Array<{ date: string; value: number }>;
    "24h": Array<{ date: string; value: number }>;
    "7d": Array<{ date: string; value: number }>;
    "30d": Array<{ date: string; value: number }>;
    "60d": Array<{ date: string; value: number }>;
    "90d": Array<{ date: string; value: number }>;
  };
}

// Type pour les données de l'API
interface ApiResponse {
  status: {
    error_code: number;
    elapsed: number;
    timestamp: string;
  };
  data: Array<{
    id: number;
    name: string;
    symbol: string;
    slug: string;
    quote: {
      USD: {
        price: number;
        percent_change_24h: number;
        percent_change_1h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_60d: number;
        percent_change_90d: number;
        market_cap: number;
      };
    };
  }>;
}

// Type pour les périodes de temps
type TimePeriod = "1h" | "24h" | "7d" | "30d" | "60d" | "90d";

// Gradients pour différentes cryptomonnaies
const gradients = {
  bitcoin: "bg-gradient-to-r from-orange-500 to-yellow-500",
  ethereum: "bg-gradient-to-r from-blue-500 to-purple-500",
  dogecoin: "bg-gradient-to-r from-green-500 to-yellow-500",
  // Gradient par défaut pour les autres cryptos
  default: "bg-gradient-to-r from-gray-500 to-blue-500",
};

export default function Cryptos() {
  const [actualites, setActualites] = useState<CryptoArticle[]>([]);
  const [marketData, setMarketData] = useState<CryptoMarketData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(
    "bitcoin"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoMarketData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimePeriod>("24h");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Gérer la recherche
  useEffect(() => {
    if (marketData.length > 0) {
      if (searchTerm.trim() === "") {
        setFilteredCryptos(marketData.slice(0, 10)); // Limiter à 10 cryptos par défaut
      } else {
        const filtered = marketData.filter((crypto) => {
          return (
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredCryptos(filtered.slice(0, 20)); // Limiter à 20 résultats de recherche
      }
    }
  }, [searchTerm, marketData]);

  // Obtenir la crypto sélectionnée
  const currentCrypto =
    selectedCrypto && marketData.length > 0
      ? marketData.find(
          (crypto) =>
            crypto.id === selectedCrypto ||
            crypto.symbol.toLowerCase() === selectedCrypto.toLowerCase()
        )
      : null;

  // Générer des données de prix historiques réalistes pour différentes périodes
  const generatePriceHistory = (crypto: CryptoMarketData) => {
    if (!crypto || typeof crypto.current_price !== "number") {
      return {
        "1h": [],
        "24h": [],
        "7d": [],
        "30d": [],
        "60d": [],
        "90d": [],
      };
    }

    // Générer l'historique pour chaque période en utilisant les pourcentages de variation réels
    return {
      "1h": generatePriceHistoryBasedOnPercentChange(
        crypto,
        60, // 60 points pour 1 heure (une donnée par minute)
        crypto.percent_change_1h || 0,
        1 / 24 // 1/24 jour = 1 heure
      ),
      "24h": generatePriceHistoryBasedOnPercentChange(
        crypto,
        24,
        crypto.price_change_percentage_24h || 0,
        1
      ),
      "7d": generatePriceHistoryBasedOnPercentChange(
        crypto,
        7,
        crypto.percent_change_7d || 0,
        7
      ),
      "30d": generatePriceHistoryBasedOnPercentChange(
        crypto,
        30,
        crypto.percent_change_30d || 0,
        30
      ),
      "60d": generatePriceHistoryBasedOnPercentChange(
        crypto,
        60,
        crypto.percent_change_60d || 0,
        60
      ),
      "90d": generatePriceHistoryBasedOnPercentChange(
        crypto,
        90,
        crypto.percent_change_90d || 0,
        90
      ),
    };
  };

  // Générer des données de prix basées sur le pourcentage de variation réel
  const generatePriceHistoryBasedOnPercentChange = (
    crypto: CryptoMarketData,
    numPoints: number,
    percentChange: number,
    daysBack: number
  ) => {
    const currentPrice = crypto.current_price;

    // Calculer le prix initial en fonction du pourcentage de variation
    const initialPrice = currentPrice / (1 + percentChange / 100);

    const priceHistory = [];

    for (let i = 0; i < numPoints; i++) {
      // Calculer la date
      const date = new Date();

      if (daysBack < 1) {
        // Pour 1h, reculer par minutes
        date.setMinutes(date.getMinutes() - (numPoints - i));

        // Formater la date (heure:minute pour 1h)
        const dateStr = date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Calculer le prix avec une progression linéaire + très légère variation aléatoire
        const progressFactor = i / (numPoints - 1);
        const randomFactor = 1 + (Math.random() * 0.005 - 0.0025); // ±0.25% de variation aléatoire
        const price =
          initialPrice +
          (currentPrice - initialPrice) * progressFactor * randomFactor;

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      } else if (daysBack <= 1) {
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

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      } else if (daysBack <= 7) {
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

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      } else if (daysBack <= 30) {
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

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      } else if (daysBack <= 60) {
        // Pour 60 jours, reculer par 2 jours
        date.setDate(date.getDate() - Math.floor((numPoints - i) * 2));

        // Formater la date (jour/mois pour 60 jours)
        const dateStr = date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });

        // Calculer le prix avec une progression non linéaire + variation aléatoire importante
        const progressFactor = i / (numPoints - 1);
        const randomFactor = 1 + (Math.random() * 0.04 - 0.02); // ±2% de variation aléatoire
        const nonLinearFactor = Math.pow(progressFactor, 1.3); // Progression non linéaire plus prononcée
        const price =
          initialPrice +
          (currentPrice - initialPrice) * nonLinearFactor * randomFactor;

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      } else {
        // Pour 90 jours, reculer par 3 jours
        date.setDate(date.getDate() - Math.floor((numPoints - i) * 3));

        // Formater la date (jour/mois pour 90 jours)
        const dateStr = date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });

        // Calculer le prix avec une progression cyclique + variation aléatoire importante
        const progressFactor = i / (numPoints - 1);
        const randomFactor = 1 + (Math.random() * 0.05 - 0.025); // ±2.5% de variation aléatoire

        // Ajouter des cycles de marché (1 cycle sur 90 jours)
        const cycleFactor = Math.sin(progressFactor * Math.PI * 2) * 0.1 + 1; // ±10% de variation cyclique

        const price =
          initialPrice +
          (currentPrice - initialPrice) *
            progressFactor *
            cycleFactor *
            randomFactor;

        priceHistory.push({
          date: dateStr,
          value: price,
        });
      }
    }

    // S'assurer que le dernier point est exactement le prix actuel
    if (priceHistory.length > 0) {
      priceHistory[priceHistory.length - 1] = {
        date:
          daysBack < 1
            ? "Maintenant"
            : daysBack <= 1
            ? "Maintenant"
            : "Aujourd'hui",
        value: currentPrice,
      };
    }

    return priceHistory;
  };

  // Obtenir les données du graphique pour une crypto et une période
  const getChartData = (crypto: CryptoMarketData, period: TimePeriod) => {
    if (!crypto) {
      return [];
    }

    // Générer l'historique des prix s'il n'existe pas
    if (!crypto.price_history) {
      crypto.price_history = generatePriceHistory(crypto);
    }

    return crypto.price_history[period];
  };

  // Obtenir le gradient pour une crypto
  const getCryptoGradient = (cryptoId: string) => {
    const id = cryptoId.toLowerCase();
    return gradients[id as keyof typeof gradients] || gradients.default;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Délai pour permettre la sélection d'une crypto avant de masquer la liste
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  const handleCryptoSelect = (cryptoId: string) => {
    console.log("Crypto sélectionnée:", cryptoId);
    setSelectedCrypto(cryptoId);
    setSearchTerm(""); // Effacer la recherche après sélection
    setIsSearchFocused(false); // Masquer la liste après sélection
    if (searchInputRef.current) {
      searchInputRef.current.blur(); // Enlever le focus de l'input
    }
  };

  const handleTimePeriodChange = (period: TimePeriod) => {
    setSelectedTimePeriod(period);
  };

  // Transformer les données brutes de l'API en format utilisable
  const transformApiData = (apiResponse: ApiResponse): CryptoMarketData[] => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
      console.error("Format de données API invalide:", apiResponse);
      return [];
    }

    return apiResponse.data.map((crypto) => {
      // Extraire les données USD de quote
      const usdData =
        crypto.quote && crypto.quote.USD
          ? crypto.quote.USD
          : { price: 0, percent_change_24h: 0, market_cap: 0 };

      return {
        id: crypto.slug || String(crypto.id), // Utiliser slug ou convertir l'ID numérique en string
        symbol: crypto.symbol,
        name: crypto.name,
        current_price: usdData.price || 0,
        price_change_percentage_24h: usdData.percent_change_24h || 0,
        market_cap: usdData.market_cap || 0,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`, // URL d'image basée sur l'ID
        // Ajouter les pourcentages de variation supplémentaires
        percent_change_1h: usdData.percent_change_1h || 0,
        percent_change_7d: usdData.percent_change_7d || 0,
        percent_change_30d: usdData.percent_change_30d || 0,
        percent_change_60d: usdData.percent_change_60d || 0,
        percent_change_90d: usdData.percent_change_90d || 0,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Récupérer les données de marché
        const apiResponse = await priceMarket();
        console.log("Données brutes reçues:", apiResponse);

        // Transformer les données
        const transformedData = transformApiData(apiResponse as ApiResponse);
        console.log("Données transformées:", transformedData);

        if (transformedData.length > 0) {
          // Générer l'historique des prix pour chaque crypto
          transformedData.forEach((crypto) => {
            crypto.price_history = generatePriceHistory(crypto);
          });

          setMarketData(transformedData);
          setFilteredCryptos(transformedData.slice(0, 10)); // Limiter à 10 cryptos par défaut

          // Trouver Bitcoin dans les données
          const bitcoin = transformedData.find(
            (crypto) =>
              crypto.id === "bitcoin" || crypto.symbol.toLowerCase() === "btc"
          );

          if (bitcoin) {
            console.log("Bitcoin trouvé:", bitcoin);
            setSelectedCrypto(bitcoin.id);
          } else {
            console.log(
              "Bitcoin non trouvé, utilisation de la première crypto:",
              transformedData[0]
            );
            setSelectedCrypto(transformedData[0].id);
          }
        } else {
          setError("Aucune donnée de cryptomonnaie disponible");
        }

        // Récupérer les actualités
        const apiKey = process.env.NEXT_PUBLIC_URL_API_KEY_ACTUALITE;
        if (apiKey) {
          const response = await axios.get(
            `https://cryptopanic.com/api/free/v1/posts/?auth_token=${apiKey}&kind=news`
          );
          setActualites(response.data.results);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors de la récupération des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtenir le libellé de la période pour l'affichage
  const getTimePeriodLabel = (period: TimePeriod): string => {
    switch (period) {
      case "1h":
        return "1 heure";
      case "24h":
        return "24 heures";
      case "7d":
        return "7 jours";
      case "30d":
        return "30 jours";
      case "60d":
        return "60 jours";
      case "90d":
        return "90 jours";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 justify-between overflow-y-auto p-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">Cryptos</h1>

          {/* Crypto sélectionnée - Affichage en haut */}
          {currentCrypto && !isLoading && (
            <div className="mb-6 p-4 rounded-lg bg-gray-800 flex items-center">
              <img
                src={currentCrypto.image}
                alt={currentCrypto.name}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {currentCrypto.name} ({currentCrypto.symbol.toUpperCase()})
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {currentCrypto.current_price.toLocaleString()} $
                  </p>
                  <p
                    className={`text-sm ${
                      currentCrypto.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {currentCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {currentCrypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Barre de recherche avec liste déroulante */}
          <div className="mb-8 relative">
            <label
              htmlFor="crypto-search"
              className="block text-lg font-semibold mb-2"
            >
              Rechercher une cryptomonnaie
            </label>

            {/* Search Bar */}
            <input
              id="crypto-search"
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher une cryptomonnaie"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />

            {/* Liste des cryptomonnaies filtrées - N'apparaît que lors de la recherche ou du focus */}
            {(isSearchFocused || searchTerm.trim() !== "") &&
              filteredCryptos.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-96 overflow-y-auto">
                  {filteredCryptos.map((crypto) => (
                    <div
                      key={crypto.id}
                      className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 flex items-center"
                      onClick={() => handleCryptoSelect(crypto.id)}
                    >
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-8 h-8 mr-3 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{crypto.name}</h3>
                          <span className="text-sm text-gray-400">
                            {crypto.symbol.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">
                            {crypto.current_price.toLocaleString()} $
                          </span>
                          <span
                            className={`text-xs ${
                              crypto.price_change_percentage_24h >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Section pour afficher le graphique */}
          {isLoading ? (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Chargement du graphique...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-red-400">Erreur: {error}</p>
            </div>
          ) : currentCrypto ? (
            <div className="grid grid-cols-1 gap-6">
              {/* Sélecteur de période */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Période: {getTimePeriodLabel(selectedTimePeriod)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["1h", "24h", "7d", "30d", "60d", "90d"] as TimePeriod[]
                    ).map((period) => (
                      <button
                        key={period}
                        onClick={() => handleTimePeriodChange(period)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          selectedTimePeriod === period
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphique */}
              <StatsCard
                title={`${
                  currentCrypto.name
                } (${currentCrypto.symbol.toUpperCase()}) - ${getTimePeriodLabel(
                  selectedTimePeriod
                )}`}
                data={getChartData(currentCrypto, selectedTimePeriod)}
                percentage={`${
                  currentCrypto.price_change_percentage_24h >= 0 ? "+" : ""
                }${currentCrypto.price_change_percentage_24h.toFixed(2)}%`}
                gradient={getCryptoGradient(currentCrypto.id)}
              />
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-gray-400">
                Aucune cryptomonnaie sélectionnée ou données non disponibles.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Actualités</h2>
          {actualites && actualites.length > 0 ? (
            actualites.slice(0, 10).map((article, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition-colors"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {article.title}
                  </h3>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>{article.source.domain}</span>
                    <span>
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Chargement des actualités...</p>
          )}
        </div>
      </main>
    </div>
  );
}
