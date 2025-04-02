import React from "react";

type WalletValueProps = {
  totalValue: string;
  percentageChange: string;
  isPositive: boolean;
};

const WalletValue: React.FC<WalletValueProps> = ({
  totalValue,
  percentageChange,
  isPositive,
}) => {
  return (
    <section className="mb-8">
      <h2 className="font-mono text-base sm:text-lg font-medium text-gray-400 mb-2 text-center sm:text-left">
        Total Value
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          {totalValue}
        </div>
        <div
          className={`mt-2 sm:mt-0 text-base sm:text-lg ${
            isPositive ? "text-green-400" : "text-red-400"
          } text-center sm:text-left`}
        >
          {percentageChange} {isPositive ? "⬆" : "⬇"}
        </div>
      </div>
    </section>
  );
};

export default WalletValue;
