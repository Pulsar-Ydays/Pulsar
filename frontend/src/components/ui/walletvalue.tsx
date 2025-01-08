import React from "react";

type WalletValueProps = {
  totalValue: string; 
  percentageChange: string;
  isPositive: boolean;
};

const WalletValue: React.FC<WalletValueProps> = ({ totalValue, percentageChange, isPositive }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-medium text-gray-400 mb-2">Wallet Value</h2>
      <div className="text-4xl font-bold">
        {totalValue}{" "}
        <span className={`text-lg ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {percentageChange} {isPositive ? "⬆" : "⬇"}
        </span>
      </div>
    </section>
  );
};

export default WalletValue;