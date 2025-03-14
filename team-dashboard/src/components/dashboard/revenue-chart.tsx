"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 2500,
  },
  {
    name: "Feb",
    revenue: 3000,
  },
  {
    name: "Mar",
    revenue: 2800,
  },
  {
    name: "Apr",
    revenue: 3200,
  },
  {
    name: "May",
    revenue: 4000,
  },
  {
    name: "Jun",
    revenue: 3800,
  },
  {
    name: "Jul",
    revenue: 4200,
  },
  {
    name: "Aug",
    revenue: 4500,
  },
  {
    name: "Sep",
    revenue: 4800,
  },
  {
    name: "Oct",
    revenue: 5000,
  },
  {
    name: "Nov",
    revenue: 4700,
  },
  {
    name: "Dec",
    revenue: 5200,
  },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Month
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Revenue
                      </span>
                      <span className="font-bold">${payload[0].value!}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "var(--primary)", opacity: 0.8 },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
