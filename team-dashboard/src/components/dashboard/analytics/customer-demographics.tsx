"use client";

import { useState, useEffect, Children } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type TimeFrame = "7days" | "30days" | "90days" | "year" | "all";

// Mock data for different timeframes (percentages remain similar across timeframes)
const mockData: Record<TimeFrame, { name: string; value: number }[]> = {
  "7days": [
    { name: "North America", value: 45 },
    { name: "Europe", value: 30 },
    { name: "Asia", value: 15 },
    { name: "Other", value: 10 },
  ],
  "30days": [
    { name: "North America", value: 42 },
    { name: "Europe", value: 32 },
    { name: "Asia", value: 16 },
    { name: "Other", value: 10 },
  ],
  "90days": [
    { name: "North America", value: 40 },
    { name: "Europe", value: 35 },
    { name: "Asia", value: 18 },
    { name: "Other", value: 7 },
  ],
  year: [
    { name: "North America", value: 38 },
    { name: "Europe", value: 36 },
    { name: "Asia", value: 20 },
    { name: "Other", value: 6 },
  ],
  all: [
    { name: "North America", value: 35 },
    { name: "Europe", value: 38 },
    { name: "Asia", value: 22 },
    { name: "Other", value: 5 },
  ],
};

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

export function CustomerDemographics({
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
      className="h-[300px]"
      config={{
        name: {
          label: "Name",
          color: "hsl(var(--primary))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Region
                        </span>
                        <span className="font-bold">{payload[0].name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Percentage
                        </span>
                        <span className="font-bold">{payload[0].value}%</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
