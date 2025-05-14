"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
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

// Schéma de validation
const registerSchema = z.object({
  username: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les règles de confidentialité." }),
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { t } = useTranslation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
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
        throw new Error("Échec de la création de l'utilisateur.");
      }

      const result = await response.json();
      setSuccessMessage("Utilisateur créé avec succès !");
      console.log("User created:", result);

      form.reset();
    } catch (error: any) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center w-full max-w-md p-6 bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-white">{t("create_account")}</h1>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("username")}</FormLabel>
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

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("email")}</FormLabel>
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

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("password")}</FormLabel>
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

        {/* Privacy Policy */}
        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 text-[#FF4DFF] bg-[#2A0140] border-gray-300 rounded focus:ring-[#FF4DFF]"
                  />
                  <FormLabel htmlFor="privacyPolicy" className="text-gray-300">
                    <span>
                      {t("J'accepte les")}{" "}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-[#FF4DFF] underline hover:text-[#D900FF] focus:outline-none"
                      >
                        {t("règles de confidentialité")}
                      </button>
                    </span>
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Modal */}
        {showPrivacyModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transaprent"
            onClick={() => setShowPrivacyModal(false)}
          >
            <div
              className="bg-[#1A1A1D] p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {t("règles de confidentialité")}
              </h2>
              <p className="text-gray-300 mb-4">{t("Voici les règles de confidentialité...")}</p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowPrivacyModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-full px-4 py-2"
                >
                  {t("Fermer")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-2 uppercase tracking-wider shadow-md"
        >
          {t("sign_up")}
        </Button>

        {/* Messages */}
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
      </form>
    </Form>
  );
}
