"use client";

import { useEffect, useState } from "react";

import { CryptoCard } from "@/components/crypto-card";
import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";
import TransactionInput from "@/components/TransactionInput";
import i18n from '../lib/i18n';
import { decodeJWT } from "./utils/jwtUtils";

import UserStatus from "@/components/ui/userstatus";
import priceMarket from '@/lib/utils';
import { useTranslation } from 'react-i18next';


const mockChartData: { date: string; value: number }[] = [
  { date: "01/01", value: 400 },
  { date: "01/02", value: 300 },
  { date: "01/03", value: 500 },
  { date: "01/04", value: 450 },
  { date: "01/05", value: 600 },
  { date: "01/06", value: 550 },
  { date: "01/07", value: 700 },
];

export default function Home() {
  // Gestion Modal "ajouter crypto"
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  // Restaurer la langue sélectionnée au chargement de la page
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "fr";
    i18n.changeLanguage(savedLanguage);
  }, []);

  // Gestion User Connecté
  const [username, setUsername] = useState<string | null>(null);

  // Stock de l'id
  const [userId, setUserId] = useState<string | null>(null);

  // On récup automatiquement le token du user connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = decodeJWT(token);
        if (decoded) {
          setUsername(decoded.username || "User");
          localStorage.setItem("user", decoded.username);
          setUserId(decoded.userId);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const [cryptoPrices, setCryptoPrices] = useState<{
    bitcoin?: { price: string; change: string; icon: string },
    ethereum?: { price: string; change: string; icon: string }
  }>({});

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await priceMarket();
        const pricesArray = response.data;
        console.log("Data reçue de priceMarket:", pricesArray);

        const bitcoin = pricesArray.find((crypto: any) => crypto.slug === 'bitcoin');
        const ethereum = pricesArray.find((crypto: any) => crypto.slug === 'ethereum');

        if (bitcoin && ethereum) {
          setCryptoPrices({
            bitcoin: {
              price: `${bitcoin.quote.USD.price.toFixed(2)} $`,
              change: `${bitcoin.quote.USD.percent_change_24h.toFixed(2)}%`,
              icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${bitcoin.id}.png`
            },
            ethereum: {
              price: `${ethereum.quote.USD.price.toFixed(2)} $`,
              change: `${ethereum.quote.USD.percent_change_24h.toFixed(2)}%`,
              icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${ethereum.id}.png`
            },
          });
        } else {
          console.warn('Bitcoin ou Ethereum non trouvé dans les données');
        }
      } catch (error) {
        console.error('Failed to fetch crypto prices', error);
      }
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">

      <Sidebar />
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0">
        <div className="flex items-center justify-between p-6">
          <h1 className="font-mono text-3xl font-bold">Overview</h1>
          <div className="flex items-center gap-4">
            <div className="bg-background/20 px-2 py-0.5 rounded text-xs">
              <UserStatus />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          <CryptoCard
            name="Bitcoin"
            symbol="BTC"
            price={cryptoPrices.bitcoin?.price || 'Chargement...'}
            change={cryptoPrices.bitcoin?.change || 'Chargement...'}
            icon={cryptoPrices.bitcoin?.icon}
            gradient="bg-gradient-to-r from-orange-500 to-yellow-500"
          />
          <CryptoCard
            name="Ethereum"
            symbol="ETH"
            price={cryptoPrices.ethereum?.price || 'Chargement...'}
            change={cryptoPrices.ethereum?.change || 'Chargement...'}
            icon={cryptoPrices.ethereum?.icon}
            gradient="bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>

        <div className="p-6">
          <div className="mb-8 bg-primary/10 rounded-lg p-8">
            <h2 className="font-mono text-2xl font-bold mb-2">
              {t('empower_with_intelligent')}
            </h2>
            <p className="font-mono text-muted-foreground mb-4">
              {t('to_keep_connected')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsCard
              title="User Growth"
              data={mockChartData}
              percentage="+5%"
              gradient="userGrowth"
            />
            <StatsCard
              title="Task Done"
              data={mockChartData}
              percentage="+8%"
              gradient="taskDone"
            />
          </div>
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full">
            <button
              onClick={closeModal}
              className=" text-white-200 hover:text-white"
            >
              X
            </button>
            <TransactionInput />
          </div>
        </div>
      )}
    </div>
  );
}







