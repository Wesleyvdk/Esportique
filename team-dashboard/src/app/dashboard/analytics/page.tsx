"use client";

import { useState } from "react";
import {
  BarChart,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalesChart } from "@/components/dashboard/analytics/sales-chart";
import { ProductPerformance } from "@/components/dashboard/analytics/product-performance";
import { CustomerDemographics } from "@/components/dashboard/analytics/customer-demographics";
import { TrafficSources } from "@/components/dashboard/analytics/traffic-sources";

export default function AnalyticsPage() {
  type TimeFrame = "7days" | "30days" | "90days" | "year" | "all";

  const [timeframe, setTimeframe] = useState<TimeFrame>("30days");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as TimeFrame)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value="$24,389.50"
          change="+12.5%"
          trend="up"
          description="vs. previous period"
          icon={<BarChart className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="+0.8%"
          trend="up"
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Customers"
          value="1,429"
          change="+18.2%"
          trend="up"
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. Order Value"
          value="$86.42"
          change="-2.3%"
          trend="down"
          description="vs. previous period"
          icon={<ShoppingBag className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Your sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesChart timeframe={timeframe} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  Best performing products by revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductPerformance timeframe={timeframe} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Customer breakdown by region</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerDemographics timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your customers are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficSources timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Sales Analysis</CardTitle>
              <CardDescription>
                In-depth view of your sales performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed sales analysis content will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Detailed analysis of your product performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Product performance analysis content will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analysis</CardTitle>
              <CardDescription>
                Detailed analysis of your customer base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customer analysis content will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ title, value, change, trend, description, icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          <span
            className={
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {trend === "up" ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
          </span>
          <span
            className={
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {change}
          </span>
          <span className="ml-1 text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
