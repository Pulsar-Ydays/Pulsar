"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CoinsIcon,
  Boxes,
  Database,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Wallet", icon: Wallet, href: "/wallet" },
  { name: "Transaction", icon: ArrowLeftRight, href: "/transaction" },
  { name: "Swap", icon: CoinsIcon, href: "/swap" },
  { name: "Staking", icon: Boxes, href: "/staking" },
  { name: "Soon", icon: Database, href: "/soon" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="relative border-r border-purple-800 bg-card h-screen w-64 pt-16">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        {" "}
        <Image
          src={"/Logo_Pulsar.png"}
          alt="Image à droite"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="font-semibold text-xl">Pulsar</span>
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
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
