import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // TTL de 5 minutes
const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
const API_KEY = '3b74b0d8-9190-4728-89f3-d7c9d4e2d4b7';  // Clef MarketCoin

// Fonction pour récupérer les données du marché
export const getCryptoData = async () => {
    const cacheKey = 'cryptoData';

    // Vérifiez si les données sont déjà en cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log("cacheData");
        return cachedData;

    }

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: {
                start: 1,
                limit: 50,
                convert: 'USD',
            },
        });

        const data = response.data;

        // Stocker les données en cache
        cache.set(cacheKey, data);
        console.log("data");
        return data;

    } catch (error) {
        console.error('Error fetching data from CoinMarketCap:', error);
        throw new Error('Failed to fetch cryptocurrency data');
    }
};
