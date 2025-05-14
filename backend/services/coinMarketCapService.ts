import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // TTL de 5 minutes
const API_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const API_KEY = "ecaddb32-4227-4dbf-89e6-5196485aa873"; // Clef MarketCoin

// Fonction pour récupérer les données du marché
export const getCryptoData = async () => {
  const cacheKey = "cryptoData";

  // Vérifiez si les données sont déjà en cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("cacheData");
    return cachedData;
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
      params: {
        start: 1,
        limit: 50,
        convert: "USD",
      },
    });

    const data = response.data;

    // Stocker les données en cache
    cache.set(cacheKey, data);
    console.log("data");
    return data;
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap:", error);
    throw new Error("Failed to fetch cryptocurrency data");
  }
};

export const getPriceBySlug = async (slug: string): Promise<number | null> => {
  const data = await getCryptoData();
  const listings = data?.data;

  if (!Array.isArray(listings)) return null;

  const found = listings.find((crypto) => crypto.slug === slug.toLowerCase());
  return found ? found.quote.USD.price : null;
};

export const getCryptoLogo = async (symbol: string): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
        params: {
          symbol: symbol.toUpperCase(), // ex: BTC, ETH
        },
      }
    );

    const data = response.data.data[symbol.toUpperCase()];
    return data?.logo || null;
  } catch (error) {
    // console.error("Erreur récupération logo :", error.response?.data || error.message);
    return null;
  }
};

export const getCoinIconUrl = (id: number) => {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
};
