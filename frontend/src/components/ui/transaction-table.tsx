import React from "react";

type Transaction = {
  currency: string;
  qteTransac: string;
  action: "Buy" | "Sell";
  profits: string;
  date_transa: string;
};

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <div className="h-auto max-h-96 overflow-y-auto lg:max-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="font-mono py-4 px-2">Currency</th>
                <th className="font-mono py-4 px-2">Quantity</th>
                <th className="font-mono px-2">Action</th>
                <th className="font-mono px-2">Profits</th>
                <th className="font-mono px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-4 px-2">{transaction.currency}</td>
                  <td className="px-2">{transaction.qteTransac}</td>
                  <td className="px-2">{transaction.action}</td>
                  <td
                    className={`px-2 text-${
                      transaction.profits.startsWith("+")
                        ? "green-500"
                        : "red-500"
                    }`}
                  >
                    {transaction.profits}
                  </td>
                  <td className="px-2">{transaction.date_transa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionTable;
