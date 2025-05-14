"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TransactionInputProps = {
  walletId: string;
  onTransactionAdded: () => void;
};

// Schéma de validation Zod
const formSchema = z.object({
  crypto: z.string().min(1),
  sellOrBuy: z.enum(["buy", "sell"]),
  unit: z.coerce.number().positive(),
  price: z.coerce.number().positive(),
});

export default function TransactionInput({
  walletId,
  onTransactionAdded,
}: TransactionInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crypto: "bitcoin",
      sellOrBuy: "buy",
      unit: 0,
      price: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      return console.error("Token ou userId manquant");
    }

    const transaction = {
      userId,
      walletId,
      type: values.sellOrBuy, // buy/sell
      symbol: values.crypto.toUpperCase(), // ex: BITCOIN
      quantity: values.unit,
      price: values.price,
      fee: 0,
      exchange: "Binance", // ou autre
    };

    try {
      const res = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      console.log("Transaction ajoutée !");
      onTransactionAdded(); // pour fermer la modal / recharger
    } catch (error) {
      console.error("Erreur API transaction :", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
        >
          <h1 className="text-3xl font-extrabold text-white">
            Ajouter une transaction
          </h1>

          {/* Crypto */}
          <FormField
            control={form.control}
            name="crypto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Crypto</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-[#2A0140] text-white p-2 w-full rounded"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="DOGE">Dogecoin (DOGE)</option>
                    <option value="ADA">Cardano (ADA)</option>
                    <option value="SOL">Solana (SOL)</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buy or Sell */}
          <FormField
            control={form.control}
            name="sellOrBuy"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Action</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-[#2A0140] text-white p-2 w-full rounded"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantité */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Quantité</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    className="bg-[#2A0140] text-white p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prix unitaire */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">
                  Prix unitaire (€)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    className="bg-[#2A0140] text-white p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md w-full"
          >
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
}
