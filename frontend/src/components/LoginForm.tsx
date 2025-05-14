"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

//Zod utilisé pou verififier les shemas
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export default function LoginForm() {
  // Gestion du formulaire
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); 
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(
          result.error || "Échec de l'authentification. Veuillez réessayer."
        );
        return;
      }

      // On stock dans le local Storage
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("user", JSON.stringify({ name: result.userName }));
      setErrorMessage("Vous êtes connecté avec succès!");

      // Redirection vers overview
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
      setErrorMessage(
        "Une erreur inattendue s'est produite. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
      >
        {/* Titre */}
        <h1 className="text-3xl font-extrabold text-white">{t('sign_in')}</h1>

        {/* Affichage des erreurs globales */}
        {errorMessage && <div className=" text-sm mb-4">{errorMessage}</div>}

        {/* Champ Email */}
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
              <FormMessage /> {/* Affichage des erreurs de validation */}
            </FormItem>
          )}
        />

        {/* Champ Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t('paasword')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Votre mot de passe"
                  {...field}
                  className="bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none focus:ring-offset-2 rounded-md transition-all"
                />
              </FormControl>
              <FormMessage /> {/* Affichage des erreurs de validation */}
            </FormItem>
          )}
        />

        {/* Lien oublié mot de passe */}
        <a href="#" className="text-xs text-[#FF4DFF] hover:underline mt-2">
          {t('forgotten_password')}
        </a>

        {/* Bouton de soumission */}
        <Button
          type="submit"
          className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md"
        >
          {t('sign_in')}
        </Button>
      </form>
    </Form>
  );
}
