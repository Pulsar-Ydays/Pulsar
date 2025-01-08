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
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4">Assets</th>
                  <th>Price</th>
                  <th>Total Balance</th>
                  <th>24h Market</th>
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
        </section>
      );
};

export default AssetTable;
