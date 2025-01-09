"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Wallet,
  CoinsIcon,
  Activity,
  Calculator,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const sidebarItems = [
  { name: "Profil", icon: User, href: "/Register" },
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
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
        <Image
          src={"/Logo_Pulsar.png"}
          alt="Image à droite"
          width={50}
          height={50}
          className="rounded-full"
        />
      </button>
      <div
        ref={sidebarRef} 
        className={`fixed top-0 left-0 h-screen bg-card border-r border-purple-800 pt-16 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:static sm:translate-x-0 w-64 sm:w-72 lg:w-80`}
      >
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
          <div className="space-y-1 p-4">
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
        </ScrollArea>
      </div>
    </>
  );
}
