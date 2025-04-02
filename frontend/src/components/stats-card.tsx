"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface StatsCardProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  percentage: string;
  gradient: string;
}

// Type pour le tooltip
type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
  }>;
  label?: string;
};

// Composant personnalisé pour le tooltip
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded-md shadow-lg">
        <p className="text-gray-300 text-xs mb-1">{label}</p>
        <p className="text-white font-medium">
          {payload[0].value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}{" "}
          $
        </p>
      </div>
    );
  }

  return null;
};

// Formater les grands nombres pour l'axe Y
const formatYAxis = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export function StatsCard({
  title,
  data,
  percentage,
  gradient,
}: StatsCardProps) {
  // Calculer les valeurs min et max pour l'axe Y
  const minValue =
    data.length > 0
      ? Math.min(...data.map((item) => item.value)) * 0.98 // 2% en dessous du minimum
      : 0;

  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => item.value)) * 1.02 // 2% au-dessus du maximum
      : 0;

  // Déterminer si la tendance est positive ou négative
  const isPositiveTrend = percentage.startsWith("+");

  // Déterminer la couleur du graphique en fonction de la tendance
  const chartColor = isPositiveTrend ? "#10b981" : "#ef4444"; // vert ou rouge

  return (
    <Card className="p-4 bg-gray-900 border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <span
          className={`text-xs ${
            isPositiveTrend ? "text-green-500" : "text-red-500"
          }`}
        >
          {percentage}
        </span>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.2} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <YAxis
              domain={[minValue, maxValue]}
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={{ stroke: "#4b5563" }}
              tickFormatter={formatYAxis}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={`url(#${gradient})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
