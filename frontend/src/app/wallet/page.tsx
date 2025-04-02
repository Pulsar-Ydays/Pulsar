"use client";

import { Sidebar } from "@/components/sidebar";
import UserStatus from "@/components/ui/userstatus";
import Wallettable from "@/components/ui/wallettable";
import WalletValue from "@/components/ui/walletvalue";
import { useEffect, useState } from "react";

import TransactionInput from "@/components/TransactionInput";
import WalletInput from "@/components/WalletInput";

import Link from "next/link";

const CRYPTO_ICONS: Record<string, string> = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png?v=026",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=026",
  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=026",
};

export default function Wallet() {
  type Holding = {
    symbol: string;
    amount: number;
    averageBuyPrice: number;
  };

  type Wallet = {
    id: string;
    name: string;
    holdings: Holding[];
  };

  type Transaction = {
    symbol: string;
    type: string;
    quantity: number;
    price: number;
    createdAt: string;
  };

  // UseState hooks for managing state
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const isToken = localStorage.getItem("token");
  // Fetch wallets de l'utilisateur
  useEffect(() => {
    const fetchWallets = async () => {
      if (!isToken) {
        return;
      }
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

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

        const formattedWallets = walletsData.map((w: any) => ({
          ...w,
          id: w._id,
        }));

        setWallets(formattedWallets);
        if (formattedWallets.length > 0) setSelectedWallet(formattedWallets[0]);
      } catch (error) {
        console.error("Erreur chargement wallets:", error);
      }
    };

    fetchWallets();
  }, []);

  useEffect(() => {
    if (wallets.length > 0 && !selectedWallet) setSelectedWallet(wallets[0]);
  }, [wallets]);

  useEffect(() => {
    console.log("wallets chargés:", wallets);
  }, [wallets]);

  //  Get transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedWallet) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/wallets/${selectedWallet.id}/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erreur lors du fetch des transactions :", error);
      }
    };

    fetchTransactions();
  }, [selectedWallet]);

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

      setWallets((prevWallets) => [
        ...prevWallets,
        { ...newWallet, id: newWallet._id },
      ]);
      setWalletModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du wallet :", error);
    }
  };

  const walletTotalValue = selectedWallet?.holdings?.reduce(
    (acc, h) => acc + h.amount * h.averageBuyPrice,
    0
  );

  const walletTotalCost = selectedWallet?.holdings?.reduce(
    (acc, h) => acc + h.amount * h.averageBuyPrice,
    0
  );

  const fakeCurrentMarketValue = selectedWallet?.holdings?.reduce(
    (acc, h) => acc + h.amount * h.averageBuyPrice * 1.02, // 2% au-dessus pour simuler
    0
  );

  const percentGain = walletTotalCost
    ? ((fakeCurrentMarketValue! - walletTotalCost) / walletTotalCost) * 100
    : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {isToken ? (
        <main className="flex-1 bg-gradient-to-b from-black to-purple-900 pt-8 min-h-full">
          <div className="max-w-full md:px-8">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="font-mono text-2xl md:text-3xl mb-4 md:mb-0">
                Wallet
              </h1>
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
                onClick={() => setTransactionModalOpen(true)}
              >
                Ajouter une transaction
              </button>

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
                      <p className="text-gray-400">
                        Aucun actif dans ce wallet.
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  Aucun wallet trouvé.
                </p>
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
