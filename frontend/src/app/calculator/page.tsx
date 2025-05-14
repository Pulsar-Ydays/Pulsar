"use client";

import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { useState } from "react";

import { useTranslation } from 'react-i18next';

export default function Calculator() {
  const { t } = useTranslation();
  const [investissementTotal, setInvestissementTotal] = useState<number | "">(
    ""
  );
  const [valeurPortefeuille, setValeurPortefeuille] = useState<number | "">("");
  const [valeurCession, setValeurCession] = useState<number | "">("");
  const [result, setResult] = useState<{
    montantImposable: number;
    montantImpots: number;
  } | null>(null);

  const isToken = localStorage.getItem("token");
  const calculateTax = () => {
    if (
      typeof investissementTotal === "number" &&
      typeof valeurPortefeuille === "number" &&
      typeof valeurCession === "number"
    ) {
      const plusValue = valeurCession - investissementTotal;
      if (plusValue <= 0) {
        setResult({
          montantImposable: 0,
          montantImpots: 0,
        });
      } else if (plusValue <= 305) {
        setResult({
          montantImposable: plusValue,
          montantImpots: 0,
        });
      } else {
        const montantImposable = plusValue;
        const montantImpots = plusValue * 0.3;
        setResult({
          montantImposable,
          montantImpots,
        });
      }
    } else {
      setResult(null);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">
      {/* Sidebar */}
      <Sidebar />
      {isToken ? (
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="font-mono text-3xl font-bold mb-8 text-center">
            Vos investissements en cryptomonnaie
          </h1>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quelle est la valeur totale de vos investissements en crypto ?
                </label>
                <input
                  type="number"
                  value={investissementTotal}
                  onChange={(e) =>
                    setInvestissementTotal(Number(e.target.value) || "")
                  }
                  className="font-mono w-full p-3 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quelle est la valeur de votre portefeuille ?
                </label>
                <input
                  type="number"
                  value={valeurPortefeuille}
                  onChange={(e) =>
                    setValeurPortefeuille(Number(e.target.value) || "")
                  }
                  className="font-mono w-full p-3 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quelle est la valeur de votre cession ?
                </label>
                <input
                  type="number"
                  value={valeurCession}
                  onChange={(e) =>
                    setValeurCession(Number(e.target.value) || "")
                  }
                  className="font-mono w-full p-3 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={calculateTax}
              className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-mono transition-all"
            >
              Calculer
            </button>

            {result !== null && (
              <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Estimation des impôts crypto
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-400">
                      Plus-value imposable
                    </h3>
                    <p className="text-2xl font-bold text-purple-400">
                      {result.montantImposable.toFixed(2)} €
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400">
                      Montant d&apos;impôt à payer
                    </h3>
                    <p className="text-2xl font-bold text-purple-400">
                      {result.montantImpots.toFixed(2)} €
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400">Flat tax</h3>
                    <p className="text-2xl font-bold text-purple-400">30 %</p>
                  </div>
                </div>
              </div>
            )}
          </div>
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
