"use client";

import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; 

export default function SlidingForm() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const handleClick = (direction: string) => {
    setIsSliding(true);
    setRightPanelActive(direction === "right");
  };

  return (
    <div className="relative bg-[#0d0318] w-screen h-screen shadow-lg overflow-hidden flex">
      <Link href="/">
        <button
          className="absolute top-4 left-4 p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 z-30"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </Link>
      <div
        className={`absolute inset-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
          rightPanelActive ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"
        } flex items-center justify-center`}
      >
        <div className="bg-white p-0 rounded-lg shadow-lg border-2 border-purple-500 hover:border-purple-700 transition-all duration-300 ring-2 ring-purple-500 ring-opacity-50">
          <RegisterForm />
        </div>
      </div>
      <div
        className={`absolute inset-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
          rightPanelActive ? "translate-x-full opacity-0 z-10" : "opacity-100 z-20"
        } flex items-center justify-center`}
      >
        <div className="bg-white p-0 rounded-lg shadow-lg border-2 border-purple-500 hover:border-purple-700 transition-all duration-300 ring-2 ring-purple-500 ring-opacity-50">
          <LoginForm />
        </div>
      </div>
      <div
        className={`absolute top-0 left-1/2 h-full w-1/2 transition-transform duration-700 ease-in-out ${
          rightPanelActive ? "-translate-x-full" : "translate-x-0"
        } ${
          rightPanelActive
            ? "bg-gradient-to-r from-[#3e016b] to-[#0d0318] animate-gradient-x"
            : "bg-gradient-to-r from-[#0d0318] to-[#3e016b] animate-gradient-x"
        }`}
      >
        <div className="text-white h-full w-full flex flex-col items-center justify-center text-center px-8">
          <div className={`flex flex-col items-center justify-center h-full ${rightPanelActive ? "" : "hidden"}`}>
            <Image
              src="/logo.png"
              alt="Logo"
              className={`w-20 h-20 mb-4 ${isSliding ? "animate-spin-left" : ""}`}
              width={100}
              height={100}
            />
            <h1 className="font-mono text-4xl font-extrabold text-white shadow-lg">Welcome Back!</h1>
            <p className="font-mono mt-4 mb-6 text-gray-200">
              To keep connected with us, please log in with your personal info.
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-2 uppercase tracking-wider mt-4"
              onClick={() => handleClick("left")}
            >
              Sign In
            </button>
          </div>
          <div className={`flex flex-col items-center justify-center h-full ${rightPanelActive ? "hidden" : ""}`}>
            <Image
              src="/logo.png"
              alt="Logo"
              className={`w-20 h-20 mb-4 ${isSliding ? "animate-spin-right" : ""}`}
              width={100}
              height={100}
            />
            <h1 className="font-mono text-4xl font-extrabold text-white shadow-lg">Hello, Explorer!</h1>
            <p className="font-mono mt-4 mb-6 text-gray-200">
              Enter your personal details and start your journey with us.
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-2 uppercase tracking-wider mt-4"
              onClick={() => handleClick("right")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
