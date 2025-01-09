"use client";

import { useState } from "react";

import { Sidebar } from "@/components/sidebar";
import { CryptoCard } from "@/components/crypto-card";
import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import TransactionInput from "@/components/TransactionInput";

import { Bitcoin, Clock } from "lucide-react";
import UserStatus from "@/components/ui/userstatus";

const mockChartData = [
  { date: "01/01", value: 400 },
  { date: "01/02", value: 300 },
  { date: "01/03", value: 500 },
  { date: "01/04", value: 450 },
  { date: "01/05", value: 600 },
  { date: "01/06", value: 550 },
  { date: "01/07", value: 700 },
];

export default function Home() {
  //Gestion Modal "ajouter crypto"
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex h-screen bg-background bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0"> 
        <div className="flex items-center justify-between p-6">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary rounded-full px-1 py-1">
              <span className="text-sm"><UserStatus /></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          <CryptoCard
            name="Bitcoin"
            symbol="BTC"
            price="$42,826.00"
            change="+1.6%"
            icon={<Bitcoin className="h-full w-full text-white" />}
            gradient="bg-gradient-to-r from-orange-500 to-yellow-500"
          />
          <CryptoCard
            name="Ethereum"
            symbol="ETH"
            price="$2,532.00"
            change="+0.25%"
            icon={<Bitcoin className="h-full w-full text-white" />} //add ethereum
            gradient="bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>

        <div className="p-6">
          <div className="mb-8 bg-primary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">
              Empower with Intelligent Innovation
            </h2>
            <p className="text-muted-foreground mb-4">
              Tomorrow Unleashed: Intelligent Innovation Awaits.
            </p>
            <Button>Learn More</Button>
          </div>
          <div className="add">
            <button
              className=" bg-[#FF4DFF] text-white py-2 px-4 rounded-md hover:bg-[#D900FF] transition"
              onClick={openModal}
            >
              Ajouter ma crypto
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsCard
              title="User Growth"
              data={mockChartData}
              percentage="+5%"
              gradient="userGrowth"
            />
            <StatsCard
              title="Task Done"
              data={mockChartData}
              percentage="+8%"
              gradient="taskDone"
            />
          </div>
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1A1A1D] p-6 rounded-lg max-w-md w-full">
            <button
              onClick={closeModal}
              className=" text-white-200 hover:text-white"
            >
              X
            </button>
            <TransactionInput />
          </div>
        </div>
      )}
    </div>
  );
}
