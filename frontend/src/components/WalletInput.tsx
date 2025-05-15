// components/WalletInput.tsx - Composant pour ajouter un wallet

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface WalletInputProps {
  onWalletCreate: (walletName: string) => void;
}

const WalletInput = ({ onWalletCreate }: WalletInputProps) => {
  const [walletName, setWalletName] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletName.trim()) return;
    onWalletCreate(walletName);
    setWalletName("");
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-white">
          {t("create_a_wallet")}
        </h1>

        {/* Champ pour le nom du wallet */}
        <Input
          type="text"
          placeholder={t("choose_the_wallet_name")}
          value={walletName}
          required
          onChange={(e) => setWalletName(e.target.value)}
          className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all p-2 w-full"
        />

        {/* Bouton de soumission */}
        <Button
          type="submit"
          className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md w-full"
        >
          {t("add")}
        </Button>
      </form>
    </div>
  );
};

export default WalletInput;
