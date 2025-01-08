"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";

export default function Calculator() {
  const [gain, setGain] = useState<number | "">("");
  const [result, setResult] = useState<number | null>(null);

  const calculateTax = () => {
    if (typeof gain === "number" && gain > 0) {
      setResult(gain * 0.7); // Calculer après taxes (70% des gains)
    } else {
      setResult(null); // Remettre à zéro si l'entrée est invalide
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Calculez vos taxes sur les cryptos
        </h1>

        {/* Input pour les gains */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            type="number"
            value={gain}
            onChange={(e) => setGain(Number(e.target.value) || "")}
            placeholder="Entrez vos gains"
            className="w-full p-3 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />

          {/* Bouton de calcul */}
          <button
            onClick={calculateTax}
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-bold transition-all"
          >
            Calculer !
          </button>
        </div>

        {/* Résultat */}
        {result !== null && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold">
              Gains après taxes :{" "}
              <span className="text-purple-400">{result.toFixed(2)}</span>
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}
