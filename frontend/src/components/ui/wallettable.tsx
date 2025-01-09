import React from "react";

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
        <div className="h-auto max-h-96 overflow-y-auto lg:max-h-[500px]"> 
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className=" font-mono py-4 px-2">Assets</th>
                  <th className="font-mono px-2  sm:table-cell">Price</th>
                  <th className="font-mono px-2 hidden sm:table-cell">Total Balance</th>
                  <th className="font-monopx-2  lg:table-cell">24h Market</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <img src={asset.icon} alt={asset.name} className="w-6 h-6 mr-2" />
                        {asset.name}
                      </div>
                    </td>
                    <td className="px-2  sm:table-cell">{asset.price}</td>
                    <td className="px-2 hidden sm:table-cell">{asset.balance}</td>
                    <td className={`px-2 lg:table-cell text-${asset.color}-500`}>
                        {asset.market} 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      

      );
};

export default AssetTable;
