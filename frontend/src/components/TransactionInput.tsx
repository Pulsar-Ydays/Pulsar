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

export default function TransactionInput() {
  const form = useForm({
    defaultValues: {
      crypto: "",
      sellOrBuy: "",
      unit: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Transaction data:", data);
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
        >
          <h1 className="text-3xl font-extrabold text-white">
            Ajouter ma crypto
          </h1>

          {/* Champ pour la crypto */}
          <FormField
            control={form.control}
            name="crypto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Select Crypto</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all p-2 w-full"
                  >
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="ethereum">Ethereum (ETH)</option>
                    <option value="dogecoin">Dogecoin (DOGE)</option>
                    <option value="cardano">Cardano (ADA)</option>
                    <option value="solana">Solana (SOL)</option>
                    <option value="polkadot">Polkadot (DOT)</option>
                    <option value="ripple">Ripple (XRP)</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ pour Sell or Buy */}
          <FormField
            control={form.control}
            name="sellOrBuy"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Sell or Buy</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all p-2 w-full"
                  >
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ pour l'unit */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your unit"
                    {...field}
                    className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md w-full"
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
