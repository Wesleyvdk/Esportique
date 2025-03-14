"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

type TimeFrame = "7days" | "30days" | "90days" | "year" | "all";

// Mock data for different timeframes
const mockData: Record<
  TimeFrame,
  { source: string; visitors: number; percentage: number; change: string }[]
> = {
  "7days": [
    { source: "Direct", visitors: 1240, percentage: 35, change: "+5.2%" },
    {
      source: "Organic Search",
      visitors: 980,
      percentage: 28,
      change: "+2.1%",
    },
    { source: "Social Media", visitors: 720, percentage: 20, change: "+8.4%" },
    { source: "Referrals", visitors: 420, percentage: 12, change: "-1.3%" },
    { source: "Email", visitors: 180, percentage: 5, change: "+0.8%" },
  ],
  "30days": [
    { source: "Direct", visitors: 4850, percentage: 32, change: "+4.8%" },
    {
      source: "Organic Search",
      visitors: 4200,
      percentage: 28,
      change: "+3.2%",
    },
    { source: "Social Media", visitors: 3150, percentage: 21, change: "+7.5%" },
    { source: "Referrals", visitors: 1950, percentage: 13, change: "-0.9%" },
    { source: "Email", visitors: 900, percentage: 6, change: "+1.2%" },
  ],
  "90days": [
    { source: "Direct", visitors: 14500, percentage: 30, change: "+3.5%" },
    {
      source: "Organic Search",
      visitors: 13800,
      percentage: 29,
      change: "+5.2%",
    },
    {
      source: "Social Media",
      visitors: 10200,
      percentage: 21,
      change: "+6.8%",
    },
    { source: "Referrals", visitors: 6300, percentage: 13, change: "+0.4%" },
    { source: "Email", visitors: 3400, percentage: 7, change: "+2.1%" },
  ],
  year: [
    { source: "Direct", visitors: 58000, percentage: 29, change: "+2.8%" },
    {
      source: "Organic Search",
      visitors: 62000,
      percentage: 31,
      change: "+6.5%",
    },
    {
      source: "Social Media",
      visitors: 40000,
      percentage: 20,
      change: "+5.2%",
    },
    { source: "Referrals", visitors: 26000, percentage: 13, change: "+1.8%" },
    { source: "Email", visitors: 14000, percentage: 7, change: "+3.4%" },
  ],
  all: [
    { source: "Direct", visitors: 185000, percentage: 28, change: "—" },
    { source: "Organic Search", visitors: 210000, percentage: 32, change: "—" },
    { source: "Social Media", visitors: 130000, percentage: 20, change: "—" },
    { source: "Referrals", visitors: 85000, percentage: 13, change: "—" },
    { source: "Email", visitors: 45000, percentage: 7, change: "—" },
  ],
};

export function TrafficSources({
  timeframe = "30days",
}: {
  timeframe: TimeFrame;
}) {
  const [data, setData] = useState(mockData[timeframe]);

  useEffect(() => {
    setData(mockData[timeframe]);
  }, [timeframe]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source</TableHead>
          <TableHead className="hidden md:table-cell">Visitors</TableHead>
          <TableHead>Distribution</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.source}>
            <TableCell className="font-medium">{item.source}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.visitors.toLocaleString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={item.percentage}
                  className="h-2 w-[60px] md:w-[100px]"
                />
                <span className="text-sm text-muted-foreground">
                  {item.percentage}%
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <span
                className={
                  item.change.startsWith("+")
                    ? "text-green-500 dark:text-green-400"
                    : item.change.startsWith("-")
                    ? "text-red-500 dark:text-red-400"
                    : "text-muted-foreground"
                }
              >
                {item.change}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
