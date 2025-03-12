"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
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
import { useState } from "react";

const registerSchema = z.object({
  username: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide "),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user. Please try again.");
      }

      const result = await response.json();
      setSuccessMessage("User created successfully!");
      console.log("User created:", result);

      form.reset();
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-white">{t ("create_account")}</h1>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t('username')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
                  {...field}
                  className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t('email')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@domain.com"
                  {...field}
                  className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t('password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md"
        >
          {t('sign_up')}
        </Button>

        {/* Success Messages */}
        {successMessage && (
          <p className="text-green-500 mt-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
      </form>
    </Form>
  );
}
