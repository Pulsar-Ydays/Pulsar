"use client";

import { Sidebar } from "@/components/sidebar";
import Wallettable from "@/components/ui/wallettable";
import WalletValue from "@/components/ui/walletvalue";
import UserStatus from "@/components/ui/userstatus";
import { useState, useEffect } from "react";

import WalletInput from "@/components/WalletInput";
import TransactionInput from "@/components/TransactionInput";

import Link from "next/link";

export default function Wallet() {
  type Asset = {
    icon: string;
    name: string;
    quantity: string;
    price: string;
    balance: string;
    market: string;
    color: "green" | "red";
  };

  type Wallet = {
    id: string;
    name: string;
    assets: Asset[];
  };

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const [wallets, setWallets] = useState<Wallet[]>([]);

  // Fetch wallets de l'utilisateur
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        console.log("UserID récupéré :", userId); // Vérifie que l'ID est correct
        console.log("Token récupéré :", token); // Vérifie que le token est bien récupéré

        if (!userId || !token) {
          throw new Error("User ID ou Token introuvable");
        }

        const response = await fetch(
          `http://localhost:3000/api/wallets/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const walletsData = await response.json();
        console.log("Wallets reçus :", walletsData);

        setWallets(walletsData);
      } catch (error) {
        console.error("Erreur lors du chargement des wallets :", error);
      }
    };

    fetchWallets();
  }, []);

  const addWallet = async (walletName: string) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("User ID ou Token introuvable");
      }

      const response = await fetch(
        `http://localhost:3000/api/wallets/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: walletName || "Nouveau Wallet",
            transactions: [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const newWallet = await response.json();
      console.log("Wallet créé :", newWallet);

      setWallets((prevWallets) => [...prevWallets, newWallet]);
      setWalletModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du wallet :", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">

  <Sidebar />
  <main className="flex-1 bg-gradient-to-b from-black via-gray-900 to-purple-900 pt-8 min-h-full">
    <div className="max-w-full md:px-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="font-mono text-2xl md:text-3xl mb-4 md:mb-0">Wallet</h1>
        <UserStatus />
      </header>

      <section className="mb-8">
        <div className="container mx-auto">
          <WalletValue 
            totalValue="$65,690.00" 
            percentageChange="10.21%" 
            isPositive={true} 
          />
        </div>
      </section>

      <div className="flex justify-center items-center mb-6 md:justify-start">
        <button
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg uppercase py-3 px-6 rounded-full shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-purple-400 active:translate-y-1 active:shadow-sm"
          onClick={() => setWalletModalOpen(true)}
        >
          Ajouter ma crypto
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full">

            <button
              onClick={() => setWalletModalOpen(true)}
              className="ml-6 btn-primary"
            >
              Ajouter un wallet +
            </button>

            {/* Affichage des wallets de l'utilisateur */}
            {wallets.length > 0 ? (
              wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="mb-6 p-4 border rounded bg-gray-800 text-white"
                >
                  <h2 className="text-xl font-semibold">{wallet.name}</h2>
                  {wallet.assets && wallet.assets.length > 0 ? (
                    <Wallettable assets={wallet.assets} />
                  ) : (
                    <p className="text-gray-400">Aucun actif dans ce wallet.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">Aucun wallet trouvé.</p>
            )}

            <Link
              href="/transactions"
              className="ml-20 text-white font-bold text-lg uppercase py-3 px-6 rounded-full shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-purple-400 active:translate-y-1 active:shadow-sm"
            >
              Mes transactions
            </Link>
            {isWalletModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full">
                  <button
                    onClick={() => setWalletModalOpen(false)}
                    className="text-white"
                  >
                    X
                  </button>
                  <WalletInput onWalletCreate={addWallet} />
                </div>
              </div>
            )}

            {isTransactionModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full">
                  <button
                    onClick={() => setTransactionModalOpen(false)}
                    className="text-white"
                  >
                    X
                  </button>
                  <TransactionInput />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}