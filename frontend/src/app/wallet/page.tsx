"use client";

import { Sidebar } from "@/components/sidebar";
import { CryptoCard } from "@/components/crypto-card";
import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Bitcoin, Clock } from "lucide-react"; //add ethereum

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <h1 className="text-3xl font-bold">Wallet</h1>
    </div>
  );
}
