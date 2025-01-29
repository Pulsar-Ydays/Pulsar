"use client";

import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const currencyIcons = {
    USDT: "../USDT.png",
    ETH: "../Eth.png",
    BTC: "../BTC.png",
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900">
      <Sidebar />
      <div className="flex flex-grow justify-center items-center">
        <div className="relative flex flex-col max-w-md w-full bg-purple-800 bg-opacity-30 p-8 rounded-lg text-white shadow-lg">
          <h1 className="font-mono text-xl font-semibold mb-6">Swap</h1>
          <div>
            <label htmlFor="from" className="block mb-2 text-sm">
              From
            </label>
            <div className="flex items-center space-x-4 bg-purple-900 py-2 px-4 rounded-lg">
              <img
                src={currencyIcons[fromCurrency]}
                alt={fromCurrency}
                className="w-10 h-10"
              />
              <select
                id="from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-purple-900 text-white flex-1 focus:outline-none appearance-none rounded-lg"
              >
                <option className="bg-purple-700 text-white">USDT</option>
                <option className="bg-purple-700 text-white">ETH</option>
                <option className="bg-purple-700 text-white">BTC</option>
              </select>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-right text-white flex-1 focus:outline-none"
              />
            </div>
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
          <div>
            <label htmlFor="to" className="block mb-2 text-sm">
              To
            </label>
            <div className="flex items-center space-x-4 bg-purple-900 py-2 px-4 rounded-lg">
              <img
                src={currencyIcons[toCurrency]}
                alt={toCurrency}
                className="w-10 h-10"
              />
              <select
                id="to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-purple-900 text-white flex-1 focus:outline-none appearance-none rounded-lg"
              >
                <option className="bg-purple-700 text-white">USDT</option>
                <option className="bg-purple-700 text-white">ETH</option>
                <option className="bg-purple-700 text-white">BTC</option>
              </select>
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-right text-white flex-1 focus:outline-none"
              />
            </div>
          </div>
          <button className="font-mono mt-6 w-full bg-purple-600 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition">
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}