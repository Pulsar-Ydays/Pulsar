import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
}

export function CryptoCard({ name, symbol, price, change, icon, gradient }: CryptoCardProps) {
  return (
    <Card className={cn("p-4", gradient)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{name}</p>
          <p className="text-xl font-bold text-white">{price}</p>
          <p className="text-sm text-white/60">{change}</p>
        </div>
        {icon && (
          <img src={icon} alt={`${name} logo`} className="w-8 h-8 rounded-full" />
        )}
      </div>
    </Card>
  );
}