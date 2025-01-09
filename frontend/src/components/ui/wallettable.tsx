import React from "react";
import WalletData from "@/components/ui/walletdata";


type Asset = {
  icon: string;
  name: string;
  price: string;
  balance: string;
  market: string;
  color: "green" | "red";
};

type AssetTableProps = {
  assets: Asset[]; 
};

const AssetTable: React.FC<AssetTableProps> = ({ assets }) => {
    return (
        <section className="bg-gray-800 rounded-lg p-6">
        <div className="max-h-96 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-4 px-2">Assets</th>
                  <th className="px-2">Price</th>
                  <th className="px-2">Total Balance</th>
                  <th className="px-2">24h Market</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, idx) => (
                  <WalletData
                    key={idx}
                    icon={asset.icon}
                    name={asset.name}
                    price={asset.price}
                    balance={asset.balance}
                    market={asset.market}
                    color={asset.color}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      

      );
};

export default AssetTable;
