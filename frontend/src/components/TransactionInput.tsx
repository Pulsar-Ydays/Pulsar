"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

import getCryptoPrice from "@/lib/priceMarket";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const formSchema = z.object({
  crypto: z.string().min(1),
  sellOrBuy: z.enum(["buy", "sell"]),
  unit: z.coerce.number().positive(),
});

type TransactionInputProps = {
  walletId: string;
  onTransactionAdded: () => void;
};

export default function TransactionInput({
  walletId,
  onTransactionAdded,
}: TransactionInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { crypto: "BTC", sellOrBuy: "buy", unit: 0 },
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number | null>(null);

  const slugMapping: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",
    ADA: "cardano",
    DOGE: "dogecoin",
  };

  const fetchPrice = async (symbol: string) => {
    const slug = slugMapping[symbol.toUpperCase()];
    if (!slug) {
      console.warn(`[fetchPrice] Slug non trouvé pour ${symbol}`);
      return 0;
    }

    try {
      const price = await getCryptoPrice(slug);
      return price;
    } catch (err) {
      console.error("[fetchPrice] Erreur récupération prix :", err);
      return 0;
    }
  };

  // MAJ du prix total dès que crypto ou unité changent
  useEffect(() => {
    const subscription = form.watch((values) => {
      const { crypto, unit } = values;
      console.log("[watch] Changement détecté:", values);

      if (crypto) {
        fetchPrice(crypto).then((price) => {
          setUnitPrice(price);
          setTotalPrice(price * (unit !== undefined && unit > 0 ? unit : 0));
        });
      } else {
        setUnitPrice(0);
        setTotalPrice(0);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const defaultCrypto = form.getValues("crypto");

    if (defaultCrypto) {
      fetchPrice(defaultCrypto).then((price) => {
        setUnitPrice(price);
      });
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("Token ou userId manquant");
      return;
    }

    const slugMapping: Record<string, string> = {
      BTC: "bitcoin",
      ETH: "ethereum",
      SOL: "solana",
      ADA: "cardano",
      DOGE: "dogecoin",
    };

    const symbol = values.crypto.toUpperCase();
    const slug = slugMapping[symbol];

    if (!slug) {
      console.error(`[submit] Slug introuvable pour ${symbol}`);
      return;
    }

    const unitPrice = await getCryptoPrice(slug);

    if (!unitPrice || unitPrice === 0) {
      console.error("[submit] Prix de la crypto non récupéré, annulation");
      return;
    }

    const transaction = {
      userId,
      walletId,
      type: values.sellOrBuy,
      symbol,
      quantity: values.unit,
      price: unitPrice,
      fee: 0,
      exchange: "Binance",
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
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

      console.log("[submit] Transaction ajoutée avec succès");
      onTransactionAdded(); // callback pour rafraîchir
    } catch (error) {
      console.error("[submit] Erreur lors de l’ajout :", error);
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

          <p className="text-sm text-purple-300 self-start">
            Prix unitaire actuel : {unitPrice ? unitPrice.toFixed(2) : "0.00"} €
          </p>

          <p className="text-sm text-gray-200 self-start">
            Total estimé : {totalPrice.toFixed(2)} €
          </p>

          <Button type="submit" className="bg-[#FF4DFF] text-white w-full">
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
}
