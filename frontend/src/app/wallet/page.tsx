"use client";

import { Sidebar } from "@/components/sidebar";
import UserStatus from "@/components/ui/userstatus";
import WalletValue from "@/components/ui/walletvalue";
import { useEffect, useState } from "react";

import TransactionInput from "@/components/TransactionInput";
import { useTranslation } from "react-i18next";
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

  useEffect(() => {
    const fetchWallets = async () => {
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

   const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { t } = useTranslation();
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
    <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">
      <Sidebar />
      <main className="flex-1  pt-8 min-h-full">
        <div className="max-w-full md:px-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="font-mono text-2xl md:text-3xl mb-4 md:mb-0">
              Wallet
            </h1>
            <UserStatus />
          </header>

          <WalletValue
            totalValue={`${fakeCurrentMarketValue?.toLocaleString("fr-FR")} €`}
            percentageChange={`${percentGain.toFixed(2)}%`}
            isPositive={percentGain >= 0}
          />

          <div className="flex items-center mb-6 gap-4">
            <button
              className="btn-primary px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-white"
              onClick={() => setTransactionModalOpen(true)}
            >
              {t('add_a_transaction')}
            </button>

            <button
              onClick={() => setWalletModalOpen(true)}
              className="text-white hover:text-purple-400"
            >
              {t('add_a_wallet')} +
            </button>

            <select
              className="ml-4 px-4 py-2 bg-gray-800 text-white rounded"
              value={selectedWallet?.id || ""}
              onChange={(e) => {
                const wallet = wallets.find((w) => w.id === e.target.value);
                setSelectedWallet(wallet || null);
              }}
            >
              <option value="" disabled>
                 {t('select_a_wallet')}
              </option>
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </select>

            <Link
              href={`/transactions?walletId=${selectedWallet?.id}`}
              className="ml-auto text-white font-bold py-2 px-4 rounded-full hover:bg-purple-600 transition"
            >
              {t('my_transactions')}
            </Link>
          </div>

          {/* Résumé par crypto */}
          {selectedWallet &&
            transactions.length > 0 &&
            (() => {
              const summaryMap = new Map<
                string,
                { totalQuantity: number; totalValue: number }
              >();

              transactions.forEach((tx) => {
                const key = tx.symbol;
                const existing = summaryMap.get(key);
                const quantity =
                  tx.type === "buy" || tx.type === "deposit"
                    ? tx.quantity
                    : -tx.quantity;
                const value = quantity * tx.price;

                if (existing) {
                  existing.totalQuantity += quantity;
                  existing.totalValue += value;
                } else {
                  summaryMap.set(key, {
                    totalQuantity: quantity,
                    totalValue: value,
                  });
                }
              });

              const summary = Array.from(summaryMap.entries());

              return (
                <div className="mt-8 p-4 rounded bg-gray-900 text-white">
                  <h2 className="text-xl font-semibold mb-4">
                    {t('holding_by_crypto')}
                  </h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-600">
                        <th className="py-2">Crypto</th>
                        <th>{t('quantity')}</th>
                        <th>{t('total_value')} (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.map(([symbol, data], idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-700 hover:bg-gray-800 transition"
                        >
                          <td className="py-2 font-medium flex items-center gap-2">
                            {CRYPTO_ICONS[symbol] && (
                              <img
                                src={CRYPTO_ICONS[symbol]}
                                alt={symbol}
                                className="w-5 h-5"
                              />
                            )}
                            {symbol}
                          </td>
                          <td
                            className={
                              data.totalQuantity >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {data.totalQuantity.toFixed(6)}
                          </td>
                          <td>
                            {data.totalValue.toLocaleString("fr-FR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}

          {/* Affichage temporaire de transactions */}
          {/* {transactions.length > 0 && (
            <div className="mt-8 p-4 rounded bg-gray-900 text-white">
              <h2 className="text-xl font-semibold mb-4">
                Dernières transactions
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-600">
                    <th className="py-2">Date</th>
                    <th>Type</th>
                    <th>Crypto</th>
                    <th>Quantité</th>
                    <th>Prix unitaire (€)</th>
                    <th>Total (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="py-2">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        className={
                          tx.type === "buy" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {tx.type.toUpperCase()}
                      </td>
                      <td>{tx.symbol}</td>
                      <td>{tx.quantity}</td>
                      <td>{tx.price.toFixed(2)}</td>
                      <td>{(tx.price * tx.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}

          {isWalletModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setWalletModalOpen(false)}
            >
              <div
                className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setWalletModalOpen(false)}
                  className="absolute top-2 right-2 text-white text-xl"
                >
                  ×
                </button>
                <WalletInput onWalletCreate={addWallet} />
              </div>
            </div>
          )}

          {isTransactionModalOpen && selectedWallet && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setTransactionModalOpen(false)}
            >
              <div
                className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setTransactionModalOpen(false)}
                  className="absolute top-2 right-2 text-white text-xl"
                >
                  ×
                </button>
                <TransactionInput
                  walletId={selectedWallet.id}
                  onTransactionAdded={() => {
                    setTransactionModalOpen(false);
                    // Optionally refresh wallets or selectedWallet data here
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
