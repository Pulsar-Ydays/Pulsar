"use client";

import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { useState } from "react";

export default function Calculator() {
  const [gain, setGain] = useState<number | "">("");
  const [result, setResult] = useState<number | null>(null);

  const isToken = localStorage.getItem("token");

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

      {isToken ? (
        <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <h1 className="font-mono text-3xl font-bold mb-6 text-center">
            Calculez vos taxes sur les cryptos
          </h1>

          {/* Input pour les gains */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <input
              type="number"
              value={gain}
              onChange={(e) => setGain(Number(e.target.value) || "")}
              placeholder="Entrez vos gains"
              className="font-mono w-full p-3 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />

            {/* Bouton de calcul */}
            <button
              onClick={calculateTax}
              className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-mono transition-all"
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
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <h1>Vous devez être connecté pour accéder à cette page</h1>
          <Link href="/register" className="mt-4">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg uppercase py-3 px-6 rounded-full shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-purple-400 active:translate-y-1 active:shadow-sm">
              Se connecter
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
