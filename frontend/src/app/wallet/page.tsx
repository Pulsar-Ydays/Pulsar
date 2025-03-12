"use client";

import { Sidebar } from "@/components/sidebar";
import Wallettable from "@/components/ui/wallettable";
import WalletValue from "@/components/ui/walletvalue";
import UserStatus from "@/components/ui/userstatus";
import { useState } from "react";
import TransactionInput from "@/components/TransactionInput";




export default function Home() {


  const assets = [
    { icon: "../BTC.png", name: "Bitcoin", price: "$39,680.00", balance: "$39,680.00", market: "+2.73%", color: "green" },
    { icon: "../Eth.png", name: "Ethereum", price: "$2,680.00", balance: "$20,450.00", market: "-3.56%", color: "red" },
    { icon: "../USDT.png", name: "Tether", price: "$1.00", balance: "$2,000.00", market: "+2.73%", color: "green" },
    { icon: "../litecoin.png", name: "Litecoin", price: "$66.76", balance: "$3,560.00", market: "+2.73%", color: "green" },
  ]; 

   const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


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
          onClick={openModal}
        >
          Ajouter ma crypto
        </button>
      </div>
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

      <div className="overflow-x-auto">
        <Wallettable assets={assets} />
      </div>
      
    </div>
  </main>
</div>

  );
}
