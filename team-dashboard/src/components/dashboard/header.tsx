"use client";

import Link from "next/link";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationSystem } from "./notification-system";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-context";
import { useOnboarding } from "@/lib/onboarding-context";

export function Header() {
  const pathname = usePathname();
  const { teamData, logout } = useAuth();
  const { startOnboarding } = useOnboarding();
  console.log(teamData);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-lg font-semibold">Esportique</span>
        </Link>
        <span className="hidden text-sm text-muted-foreground md:inline-block">
          Team Dashboard
        </span>
      </div>
      <div className="flex items-center gap-4">
        <NotificationSystem />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Help"
          onClick={startOnboarding}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
              id="profile-dropdown"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Team Avatar" />
                <AvatarFallback>
                  {teamData?.first_name?.substring(0, 2) || "TE"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {teamData?.team?.name || "Team Name"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {teamData?.email || "team@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
