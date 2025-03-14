"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  CircleDollarSign,
  Home,
  MessageSquare,
  PlusCircle,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    id: "dashboard-overview",
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: ShoppingBag,
    id: "products-link",
  },
  {
    title: "Requests",
    href: "/dashboard/requests",
    icon: PlusCircle,
    id: "requests-link",
  },
  {
    title: "Revenue & Payouts",
    href: "/dashboard/revenue",
    icon: CircleDollarSign,
    id: "revenue-link",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    id: "analytics-link",
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: MessageSquare,
    id: "support-link",
  },
];

const accountItems = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className="hidden border-r bg-background md:block md:w-64"
      id="sidebar-navigation"
    >
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex h-12 items-center rounded-md bg-primary/10 px-4">
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Team Dashboard</span>
            </div>
          </div>
          <nav className="grid gap-1 py-2">
            {sidebarNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                id={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <Separator className="my-2" />

          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">
              Account
            </h3>
            <nav className="grid gap-1">
              {accountItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
