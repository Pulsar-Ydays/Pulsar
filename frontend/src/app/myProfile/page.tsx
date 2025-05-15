"use client";

import { Sidebar } from "@/components/sidebar";
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

export default function ProfileForm() {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //Get By Id
  const fetchUserProfile = async (userId: string) => {
    //Récupération du Token pour authorisé la requête
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      throw new Error("No token found");
    }

    console.log("Fetching user profile for user ID:", userId);

    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      console.error("Error response from server:", errorDetails);
      throw new Error(errorDetails.message || "Failed to fetch user profile");
    }

    return await res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID is missing.");
        }

        const profile = await fetchUserProfile(userId);
        console.log("Profile fetched:", profile);

        form.reset({
          name: profile.username,
          email: profile.email,
          password: "",
        });
      } catch (err) {
        console.error("Failed to load user profile:", (err as Error).message);
        setError("Failed to load your profile. Try again later.");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("User ID or token is missing.");
      }

      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          ...(data.password && { password: data.password }),
        }),
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error("Update failed:", errorDetails);
        setError(errorDetails.message || "Failed to update profile");
        return;
      }

      const updatedProfile = await res.json();
      console.log("Profile updated successfully:", updatedProfile);
      setError(null);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const deleteUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("User ID or token is missing.");
      }

      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error("Delete failed:", errorDetails);
        setError(errorDetails.message || "Failed to delete profile");
        return;
      }

      alert("Profile deleted successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    } catch (err) {
      console.error("Delete profile error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full bg-[#1E1E2E] border border-[#2C2C3E] rounded-2xl shadow-2xl p-10 transform transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {t('my_profile')}
            </h1>

            <div className="w-full">
              {/* Input Fields */}
              <div className="grid grid-cols-1 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#A0AEC0] font-medium tracking-wider uppercase text-sm">{t('name')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('your_name')}
                          {...field}
                          className="w-full p-4 bg-[#2C2C3E] text-[#E2E8F0] border border-[#3A3A4E] rounded-xl focus:border-[#6A5ACD] focus:ring-2 focus:ring-[#6A5ACD]/50 focus:outline-none transition-all duration-300 ease-in-out"
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
                      <FormLabel className="text-[#A0AEC0] font-medium tracking-wider uppercase text-sm">{t('email')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('example')}
                          {...field}
                          className="w-full p-4 bg-[#2C2C3E] text-[#E2E8F0] border border-[#3A3A4E] rounded-xl focus:border-[#6A5ACD] focus:ring-2 focus:ring-[#6A5ACD]/50 focus:outline-none transition-all duration-300 ease-in-out"
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
                      <FormLabel className="text-[#A0AEC0] font-medium tracking-wider uppercase text-sm">{t('password')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('your_password')}
                          {...field}
                          className="w-full p-4 bg-[#2C2C3E] text-[#E2E8F0] border border-[#3A3A4E] rounded-xl focus:border-[#6A5ACD] focus:ring-2 focus:ring-[#6A5ACD]/50 focus:outline-none transition-all duration-300 ease-in-out"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4">
               <Link href="/data-policy">
              <Button
                className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
              >
                {t('data_policy')}
              </Button>
            </Link>
              <Button
                type="submit"
                className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
              >
                {t('update_profile')}
              </Button>

              <Link href="/register">
                <Button
                  className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                  }}
                >
                  {t('disconnection')}
                </Button>
              </Link>

              <Button
                className="bg-red-600 hover:bg-red-800 text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
                onClick={deleteUser}
              >
                {t('delete_account')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
