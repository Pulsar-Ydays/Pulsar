import Wallet from "../../model/walletModel";
import Transaction from "../../model/transacModel";

interface TransactionInput {
  userId: string;
  walletId: string;
  type: "buy" | "sell" | "deposit" | "withdraw";
  symbol: string;
  quantity: number;
  price: number;
  fee?: number;
  exchange?: string;
}

export const createTransac = async (data: TransactionInput) => {
  if (!data.walletId) throw new Error("walletId manquant dans la requête");

  // Calculer automatiquement la valeur totale
  const totalValue = data.quantity * data.price;

  // Créer la transaction principale
  const transaction = await Transaction.create({
    ...data,
    totalValue,
  });

  const wallet = await Wallet.findById(data.walletId);

  if (!wallet) {
    throw new Error("Wallet introuvable");
  }

  // Ajouter la transaction dans le wallet
  wallet.transactions.push(transaction);

  const symbol = data.symbol.toUpperCase();
  const quantity = Number(data.quantity);
  const price = Number(data.price);

  let holding = wallet.holdings.find((h) => h.symbol === symbol);

  if (holding) {
    switch (data.type) {
      case "buy":
        const totalAmount = holding.amount + quantity;
        holding.averageBuyPrice =
          (holding.amount * holding.averageBuyPrice + quantity * price) /
          totalAmount;
        holding.amount = totalAmount;
        break;

      case "sell":
        holding.amount = Math.max(0, holding.amount - quantity);
        break;

      case "deposit":
        holding.amount += quantity;
        break;

      case "withdraw":
        holding.amount = Math.max(0, holding.amount - quantity);
        break;
    }
  } else {
    // Ajouter une nouvelle crypto au wallet
    wallet.holdings.push({
      symbol,
      id_api: Date.now(), // Remplace par un vrai ID si tu synchronises avec une API externe
      amount: quantity,
      averageBuyPrice: price,
    });
  }

  // Recalcul du totalValue du wallet (somme des cryptos × leur avg price)
  wallet.totalValue = wallet.holdings.reduce((total, h) => {
    return total + h.amount * h.averageBuyPrice;
  }, 0);

  await wallet.save();

  return transaction;
};
