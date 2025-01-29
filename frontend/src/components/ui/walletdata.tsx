import * as React from 'react';
import Image from "next/image";


type AssetRowProps = {
    icon: string; 
    name: string; 
    price: string; 
    balance: string; 
    market: string; 
    color: "green" | "red"; 
  };
export default function WalletData({ icon, name, price, balance, market, color,}: AssetRowProps)  {
  return (
    <tr className="border-b border-gray-700">
      <td className="py-4 flex items-center gap-4">
        <Image src={`/${icon}`} alt={name} width={32} height={32} />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-400 text-sm">{name}</p>
        </div>
      </td>
      <td>{price}</td>
      <td>{balance}</td>
      <td className={`font-bold ${color === "green" ? "text-green-400" : "text-red-400"}`}>
        {market}
      </td>
    </tr>
  );
}
