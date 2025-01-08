"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";

// Données simulées pour les graphiques
const bitcoinData = [
  { date: "01/01", value: 500 },
  { date: "01/02", value: 550 },
  { date: "01/03", value: 520 },
  { date: "01/04", value: 600 },
  { date: "01/05", value: 580 },
];

const ethereumData = [
  { date: "01/01", value: 300 },
  { date: "01/02", value: 320 },
  { date: "01/03", value: 310 },
  { date: "01/04", value: 350 },
  { date: "01/05", value: 340 },
];

const dogecoinData = [
  { date: "01/01", value: 20 },
  { date: "01/02", value: 22 },
  { date: "01/03", value: 21 },
  { date: "01/04", value: 25 },
  { date: "01/05", value: 24 },
];

const cryptoData = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    chartData: bitcoinData,
    percentage: "+5%",
    gradient: "bg-gradient-to-r from-orange-500 to-yellow-500",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    chartData: ethereumData,
    percentage: "+3%",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  dogecoin: {
    name: "Dogecoin",
    symbol: "DOGE",
    chartData: dogecoinData,
    percentage: "+8%",
    gradient: "bg-gradient-to-r from-green-500 to-yellow-500",
  },
};

export default function Cryptos() {
  const [selectedCrypto, setSelectedCrypto] = useState<
    keyof typeof cryptoData | null
  >(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as keyof typeof cryptoData;
    setSelectedCrypto(value || null);
  };

  const currentCrypto = selectedCrypto ? cryptoData[selectedCrypto] : null;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Cryptos</h1>

        {/* Input pour sélectionner une crypto */}
        <div className="mb-8">
          <label
            htmlFor="crypto-select"
            className="block text-lg font-semibold mb-2"
          >
            Select a Cryptocurrency
          </label>
          <select
            id="crypto-select"
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a Cryptocurrency
            </option>
            {Object.keys(cryptoData).map((cryptoKey) => (
              <option key={cryptoKey} value={cryptoKey}>
                {cryptoData[cryptoKey as keyof typeof cryptoData].name}
              </option>
            ))}
          </select>
        </div>

        {/* Section pour afficher le graphique */}
        {currentCrypto ? (
          <div className="grid grid-cols-1 gap-6">
            <StatsCard
              title={`${currentCrypto.name} (${currentCrypto.symbol}) Chart`}
              data={currentCrypto.chartData}
              percentage={currentCrypto.percentage}
              gradient={currentCrypto.gradient}
            />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>Please select a cryptocurrency to view its chart.</p>
          </div>
        )}
      </main>
    </div>
  );
}
