"use client";

import { Sidebar } from "@/components/sidebar";
import UserStatus from "@/components/ui/userstatus";
import TransactionTable from "@/components/ui/transaction-table";
import Link from "next/link";

//Schema Asset
type Transactions = {
  currency: string;
  qteTransac: string;
  action: "Buy" | "Sell";
  profits: string;
  date_transa: string;
};

// Données temporaires
const transactions: Transactions[] = [
  {
    currency: "Bitcoin (BTC)",
    qteTransac: "0.5",
    action: "Buy",
    profits: "-54 €",
    date_transa: "2025-01-28",
  },
  {
    currency: "Ethereum (ETH)",
    qteTransac: "2",
    action: "Sell",
    profits: "+1251,01 €",
    date_transa: "2025-01-27",
  },
  {
    currency: "Litecoin (LTC)",
    qteTransac: "1.2",
    action: "Buy",
    profits: "-7 €",
    date_transa: "2025-01-25",
  },
];

export default function Transactions() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-black to-purple-900 pt-8 min-h-full">
        <div className="max-w-full md:px-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex">
              <Link href={"/wallet"} className="font-mono text-3xl md:text-4xl">
                &lt;
              </Link>
              <h1 className="font-mono text-2xl md:text-3xl mb-4 md:mb-0 ml-6">
                Mes transactions
              </h1>
            </div>
            <UserStatus />
          </header>

          {/* Tableau des transactions */}
          <TransactionTable transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
