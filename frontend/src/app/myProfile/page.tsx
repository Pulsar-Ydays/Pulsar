"use client";

import Image from "next/image";
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
import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(), // Password can be optional for updates
});

export default function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe", // Example default value
      email: "john.doe@example.com", // Example default value
      password: "", // Leave empty initially
    },
  });

  const onSubmit = (data: any) => {
    console.log("Updated profile data:", data);
    // Add logic to handle profile updates here
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
      </div>
    </div>
  );
}
