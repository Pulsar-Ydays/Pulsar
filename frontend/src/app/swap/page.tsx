"use client";

import { Sidebar } from "@/components/sidebar";
import priceMarket from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image?: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour transformer les données de l'API
  const transformApiData = (apiResponse: any): CryptoData[] => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
      console.error("Format de données API invalide:", apiResponse);
      return [];
    }

    return apiResponse.data.map((crypto: any) => {
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
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`, // URL d'image basée sur l'ID
      };
    });
  };

  // Récupérer les données des cryptos
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true);
        const data = await priceMarket();

        // Vérifier la structure des données et extraire le tableau de cryptos
        let cryptoArray: CryptoData[] = [];

        if (data && Array.isArray(data)) {
          cryptoArray = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          // Si les données sont dans un format { data: [...] }
          cryptoArray = transformApiData(data);
        } else {
          console.error("Format de données inattendu:", data);
          setError("Format de données inattendu");
          setCryptoData([]);
          setIsLoading(false);
          return;
        }

        // Limiter à 10 cryptomonnaies
        const limitedCryptoData = cryptoArray.slice(0, 10);

        // Vérifier si les prix sont valides
        const validCryptoData = limitedCryptoData.map((crypto) => ({
          ...crypto,
          current_price: crypto.current_price > 0 ? crypto.current_price : 1, // Valeur par défaut si prix à 0
        }));

        console.log("Données des cryptos:", validCryptoData);
        setCryptoData(validCryptoData);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de récupérer les cours des cryptomonnaies");
        setCryptoData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  // Calculer la conversion lorsque fromAmount ou les devises changent
  useEffect(() => {
    if (fromAmount && cryptoData.length > 0) {
      calculateConversion();
    }
  }, [fromAmount, fromCurrency, toCurrency, cryptoData]);

  // Fonction pour calculer la conversion
  const calculateConversion = () => {
    if (!fromAmount || isNaN(Number(fromAmount)) || cryptoData.length === 0) {
      setToAmount("");
      return;
    }

    // Trouver les prix des cryptos sélectionnées
    const fromCrypto = cryptoData.find((c) => c.symbol === fromCurrency);
    const toCrypto = cryptoData.find((c) => c.symbol === toCurrency);

    // Si l'une des cryptos n'est pas trouvée, on ne peut pas calculer
    if (!fromCrypto || !toCrypto) {
      setToAmount("");
      return;
    }

    // Vérifier que les prix sont valides
    if (fromCrypto.current_price <= 0 || toCrypto.current_price <= 0) {
      console.error("Prix invalides:", { from: fromCrypto, to: toCrypto });
      setToAmount("");
      return;
    }

    // Calculer la conversion
    const fromValue = Number(fromAmount);
    const fromPrice = fromCrypto.current_price;
    const toPrice = toCrypto.current_price;

    // Conversion: (montant * prix_source) / prix_destination
    const convertedAmount = (fromValue * fromPrice) / toPrice;

    // Formater avec 6 décimales maximum
    setToAmount(convertedAmount.toFixed(6));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const isToken = localStorage.getItem("token");

  // Obtenir la liste des cryptos disponibles
  const availableCurrencies = Array.isArray(cryptoData)
    ? cryptoData.map((crypto) => crypto.symbol)
    : [];

  // Fonction pour obtenir l'image d'une crypto
  const getCryptoImage = (symbol: string) => {
    if (!Array.isArray(cryptoData)) return "/placeholder.png";

    const crypto = cryptoData.find((c) => c.symbol === symbol);
    if (!crypto) return "/placeholder.png";

    // Utiliser l'image de l'API ou générer l'URL comme dans la page des cryptos
    return (
      crypto.image ||
      `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
    );
  };

  // Fonction pour obtenir le prix en USD d'une crypto
  const getCryptoPrice = (symbol: string) => {
    if (!Array.isArray(cryptoData)) return 0;

    const crypto = cryptoData.find((c) => c.symbol === symbol);
    return crypto?.current_price || 0;
  };

  // Calculer le prix total en USD pour le montant source
  const getFromAmountUSD = () => {
    if (!fromAmount || isNaN(Number(fromAmount))) return 0;
    const price = getCryptoPrice(fromCurrency);
    return (Number(fromAmount) * price).toFixed(2);
  };

  // Calculer le prix total en USD pour le montant converti
  const getToAmountUSD = () => {
    if (!toAmount || isNaN(Number(toAmount))) return 0;
    const price = getCryptoPrice(toCurrency);
    return (Number(toAmount) * price).toFixed(2);
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">
      <Sidebar />
      <div className="flex flex-grow justify-center items-center">
        {isToken ? (
          <div className="relative flex flex-col max-w-md w-full bg-purple-800 bg-opacity-30 p-8 rounded-lg text-white shadow-lg">
            <h1 className="font-mono text-xl font-semibold mb-6">Swap</h1>

            {isLoading ? (
              <div className="text-center py-4">
                <p>{t('loading_cryptocurrency_prices')}...</p>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-400">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="w-full">
                  <label htmlFor="from" className="block mb-2 text-sm">
                    De
                  </label>
                  <div className="flex items-center space-x-4 bg-purple-900 py-2 px-4 rounded-lg">
                    <img
                      src={getCryptoImage(fromCurrency)}
                      alt={fromCurrency}
                      className="w-10 h-10"
                    />
                    <select
                      id="from"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="bg-purple-900 text-white flex-1 focus:outline-none appearance-none rounded-lg"
                    >
                      {availableCurrencies.length > 0 ? (
                        availableCurrencies.map((currency) => (
                          <option
                            key={currency}
                            className="bg-purple-700 text-white"
                          >
                            {currency}
                          </option>
                        ))
                      ) : (
                        <option className="bg-purple-700 text-white">
                          USDT
                        </option>
                      )}
                    </select>
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-transparent text-right text-white flex-1 focus:outline-none w-full min-w-0"
                    />
                  </div>
                  {fromAmount && (
                    <div className="mt-2 text-sm text-gray-300">
                      <p>{t('value')} {getFromAmountUSD()} USD</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center my-4">
                  <button
                    onClick={handleSwap}
                    className="bg-purple-700 p-3 rounded-full transform hover:rotate-180 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l5.25-5.25M12 19.5l-5.25-5.25"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <label htmlFor="to" className="block mb-2 text-sm">
                    {t('towards')}
                  </label>
                  <div className="flex items-center space-x-4 bg-purple-900 py-2 px-4 rounded-lg">
                    <img
                      src={getCryptoImage(toCurrency)}
                      alt={toCurrency}
                      className="w-10 h-10"
                    />
                    <select
                      id="to"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="bg-purple-900 text-white flex-1 focus:outline-none appearance-none rounded-lg"
                    >
                      {availableCurrencies.length > 0 ? (
                        availableCurrencies.map((currency) => (
                          <option
                            key={currency}
                            className="bg-purple-700 text-white"
                          >
                            {currency}
                          </option>
                        ))
                      ) : (
                        <option className="bg-purple-700 text-white">
                          ETH
                        </option>
                      )}
                    </select>
                    <input
                      type="number"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-transparent text-right text-white flex-1 focus:outline-none maw-w-0 w-full"
                      readOnly
                    />
                  </div>
                  {toAmount && (
                    <div className="mt-2 text-sm text-gray-300">
                      <p>{t('value')}: {getToAmountUSD()} USD</p>
                    </div>
                  )}
                </div>

                {fromAmount && toAmount && (
                  <div className="mt-4 text-sm text-gray-300">
                    <p>
                      {t('conversion_rate')} 1 {fromCurrency} ={" "}
                      {(Number(toAmount) / Number(fromAmount)).toFixed(6)}{" "}
                      {toCurrency}
                    </p>
                  </div>
                )}

                <button className="font-mono mt-6 w-full bg-purple-600 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition">
                  Swap
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen w-full">
            <h1>{t('you_must_be_logged_in')}</h1>
            <Link href="/register" className="mt-4">
              <button className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg uppercase py-3 px-6 rounded-full shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-purple-400 active:translate-y-1 active:shadow-sm">
                {t('log_in')}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
