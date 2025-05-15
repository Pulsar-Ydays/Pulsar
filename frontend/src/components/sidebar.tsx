// Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  Calculator,
  CoinsIcon,
  LayoutDashboard,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

// Vérification de la présence du token
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const sidebarItems = [
  { name: "Profil", icon: User, href: token ? "/myProfile" : "/register" },
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Wallet", icon: Wallet, href: "/wallet" },
  { name: "Swap", icon: CoinsIcon, href: "/swap" },
  { name: "Cryptos", icon: Activity, href: "/cryptos" },
  { name: "Calculator", icon: Calculator, href: "/calculator" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 sm:hidden rounded-md text-white"
      >
        ☰
      </button>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen z-50 bg-background border-r border-purple-800 pt-16 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 sm:static sm:translate-x-0 w-64 max-w-[80%] sm:w-72 lg:w-80 z-50 max-h-screen overflow-y-auto flex flex-col`}
      >
        {/* Logo et éléments du menu */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Image
            src={"/Logo_Pulsar.png"}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="font-mono text-xl text-white">Pulsar</span>
        </div>

        <ScrollArea className="h-full w-full">
          <div className="space-y-1 p-4 flex-grow">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm sm:text-base"
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
          <LanguageSwitcher />
        </ScrollArea>

        {/* Footer intégré dans la sidebar */}
        <div className="mt-auto py-4">
          <ul className="flex justify-center gap-6">
          </ul>
          <p className="text-xs text-white text-center mt-4">
            &copy; 2025 Pulsar. All rights reserved.
            <br />
            <Link href="/data-policy" className="underline">Data Policy</Link>
          </p>
        </div>
      </div>
    </>
  );
}
