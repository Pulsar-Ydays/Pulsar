import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceMarket = async () => {
  const response = await fetch(`${baseUrl}/api/crypto`);
  const data = await response.json();
  return data;
};

export default priceMarket;
