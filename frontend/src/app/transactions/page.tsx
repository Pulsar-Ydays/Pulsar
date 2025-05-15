"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import UserStatus from "@/components/ui/userstatus";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Transactions() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const walletId = searchParams.get("walletId");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!walletId || !token) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/wallets/${walletId}/transactions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Erreur fetch des transactions :", err);
      }
    };

    fetchTransactions();
  }, [walletId]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-black to-purple-900 pt-8 min-h-full">
        <div className="max-w-full md:px-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex">
              <Link href="/wallet" className="font-mono text-3xl md:text-4xl">
                &lt;
              </Link>
              <h1 className="font-mono text-2xl md:text-3xl mb-4 md:mb-0 ml-6">
                {t('my_transactions')}
              </h1>
            </div>
            <UserStatus />
          </header>

          {transactions.length > 0 ? (
            <div className="mt-4 bg-gray-900 rounded-lg p-4">
              <h2 className="text-white text-xl font-semibold mb-4">
                {t('latest_transactions')}
              </h2>
              <table className="w-full text-sm text-white">
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
                  {transactions.map((tx: any, idx: number) => (
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
          ) : (
            <p className="text-white text-center mt-8">
              {t('no_transaction_for_this_wallet')}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
