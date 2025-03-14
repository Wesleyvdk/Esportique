"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type TimeFrame = "7days" | "30days" | "90days" | "year" | "all";

// Mock data for different timeframes
const mockData: Record<TimeFrame, { name: string; sales: number }[]> = {
  "7days": [
    { name: "Team Jersey", sales: 42 },
    { name: "Premium Hoodie", sales: 28 },
    { name: "Team Cap", sales: 18 },
    { name: "Mousepad", sales: 12 },
    { name: "Water Bottle", sales: 10 },
  ],
  "30days": [
    { name: "Team Jersey", sales: 156 },
    { name: "Premium Hoodie", sales: 98 },
    { name: "Team Cap", sales: 76 },
    { name: "Mousepad", sales: 54 },
    { name: "Water Bottle", sales: 42 },
  ],
  "90days": [
    { name: "Team Jersey", sales: 420 },
    { name: "Premium Hoodie", sales: 310 },
    { name: "Team Cap", sales: 240 },
    { name: "Mousepad", sales: 180 },
    { name: "Water Bottle", sales: 150 },
  ],
  year: [
    { name: "Team Jersey", sales: 1850 },
    { name: "Premium Hoodie", sales: 1240 },
    { name: "Team Cap", sales: 980 },
    { name: "Mousepad", sales: 720 },
    { name: "Water Bottle", sales: 580 },
  ],
  all: [
    { name: "Team Jersey", sales: 5240 },
    { name: "Premium Hoodie", sales: 3980 },
    { name: "Team Cap", sales: 2760 },
    { name: "Mousepad", sales: 1890 },
    { name: "Water Bottle", sales: 1450 },
  ],
};

export function ProductPerformance({
  timeframe = "30days",
}: {
  timeframe: TimeFrame;
}) {
  const [data, setData] = useState(mockData[timeframe]);

  useEffect(() => {
    setData(mockData[timeframe]);
  }, [timeframe]);

  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            className="stroke-muted"
          />
          <XAxis
            type="number"
            tick={{ fill: "currentColor", opacity: 0.7 }}
            tickLine={{ stroke: "currentColor", opacity: 0.2 }}
            axisLine={{ stroke: "currentColor", opacity: 0.2 }}
            className="text-sm"
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "currentColor", opacity: 0.7 }}
            tickLine={{ stroke: "currentColor", opacity: 0.2 }}
            axisLine={{ stroke: "currentColor", opacity: 0.2 }}
            width={100}
            className="text-sm"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="sales" fill="var(--primary)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
