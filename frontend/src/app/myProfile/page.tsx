"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
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

  const onSubmit = (data: any) => {
    console.log("Updated profile data:", data);
    //update
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" max-w-4xl flex flex-col bg-[#1A1A1D] bg-opacity-90 shadow-xl rounded-lg p-8"
          >
            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-8 text-white">
              My Profile
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <Image
                  src="/ppUser.png"
                  width={150}
                  height={150}
                  alt="Profile picture"
                  className="rounded-full"
                />
              </div>

              {/* Input Fields */}
              <div className="flex flex-col w-full space-y-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="w-full p-3 bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none rounded-md transition-all"
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
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@domain.com"
                          {...field}
                          className="w-full p-3 bg-[#2A0140] text-gray-200 border border-transparent focus:border-[#FF4DFF] focus:ring-2 focus:ring-[#FF4DFF] focus:outline-none rounded-md transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            className="bg-[#FF4DFF] hover:bg-[#D900FF] text-white rounded-full px-8 py-3 uppercase tracking-wider shadow-md"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              window.location.href = "/Register";
            }}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}
