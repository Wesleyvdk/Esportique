"use client";

import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
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
const mockData: Record<TimeFrame, { date: string; revenue: number }[]> = {
  "7days": [
    { date: "Mon", revenue: 1200 },
    { date: "Tue", revenue: 1800 },
    { date: "Wed", revenue: 1600 },
    { date: "Thu", revenue: 2200 },
    { date: "Fri", revenue: 2800 },
    { date: "Sat", revenue: 3200 },
    { date: "Sun", revenue: 2400 },
  ],
  "30days": Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 3000) + 1000,
  })),
  "90days": Array.from({ length: 12 }, (_, i) => ({
    date: `Week ${i + 1}`,
    revenue: Math.floor(Math.random() * 15000) + 5000,
  })),
  year: [
    { date: "Jan", revenue: 12000 },
    { date: "Feb", revenue: 18000 },
    { date: "Mar", revenue: 16000 },
    { date: "Apr", revenue: 22000 },
    { date: "May", revenue: 28000 },
    { date: "Jun", revenue: 32000 },
    { date: "Jul", revenue: 24000 },
    { date: "Aug", revenue: 26000 },
    { date: "Sep", revenue: 30000 },
    { date: "Oct", revenue: 28000 },
    { date: "Nov", revenue: 32000 },
    { date: "Dec", revenue: 38000 },
  ],
  all: [
    { date: "2020", revenue: 120000 },
    { date: "2021", revenue: 180000 },
    { date: "2022", revenue: 220000 },
    { date: "2023", revenue: 280000 },
    { date: "2024", revenue: 320000 },
  ],
};

export function SalesChart({ timeframe = "30days" }: { timeframe: TimeFrame }) {
  const [data, setData] = useState(mockData[timeframe]);

  useEffect(() => {
    setData(mockData[timeframe]);
  }, [timeframe]);

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted"
            vertical={true}
            horizontal={true}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "currentColor", opacity: 0.7 }}
            tickLine={{ stroke: "currentColor", opacity: 0.2 }}
            axisLine={{ stroke: "currentColor", opacity: 0.2 }}
            className="text-sm"
          />
          <YAxis
            tick={{ fill: "currentColor", opacity: 0.7 }}
            tickLine={{ stroke: "currentColor", opacity: 0.2 }}
            axisLine={{ stroke: "currentColor", opacity: 0.2 }}
            tickFormatter={(value) => `$${value}`}
            className="text-sm"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "var(--primary)" }}
            activeDot={{ r: 6, strokeWidth: 2, fill: "var(--primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
