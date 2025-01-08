"use client";

import { Sidebar } from "@/components/sidebar";
import Wallettable from "@/components/ui/wallettable";
import WalletValue from "@/components/ui/walletvalue";
import UserStatus from "@/components/ui/userstatus";


export default function Home() {


  const assets = [
    { icon: "logo.png", name: "Bitcoin", price: "$39,680.00", balance: "$39,680.00", market: "+2.73%", color: "green" },
    { icon: "logo.png", name: "Ethereum", price: "$2,680.00", balance: "$20,450.00", market: "-3.56%", color: "red" },
    { icon: "logo.png", name: "Tether", price: "$1.00", balance: "$2,000.00", market: "+2.73%", color: "green" },
    { icon: "logo.png", name: "Litecoin", price: "$66.76", balance: "$3,560.00", market: "+2.73%", color: "green" },
    { icon: "logo.png", name: "Bitcoin", price: "$39,680.00", balance: "$39,680.00", market: "+2.73%", color: "green" },
    { icon: "logo.png", name: "Ethereum", price: "$2,680.00", balance: "$20,450.00", market: "-3.56%", color: "red" },
    { icon: "logo.png", name: "Tether", price: "$1.00", balance: "$2,000.00", market: "+2.73%", color: "green" },
    { icon: "logo.png", name: "Litecoin", price: "$66.76", balance: "$3,560.00", market: "+2.73%", color: "green" },
  ]; 


  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-black to-purple-900 p-8">
      <div className="max-w-full">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Wallet</h1>
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
        <Wallettable assets={assets} />
      </div>
    </main>
    </div>
  );
}
