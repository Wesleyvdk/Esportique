"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
};

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const { team } = useAuth();

  // Simulate fetching notifications
  useEffect(() => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Order",
        message: "You have received a new order for Team Jersey 2023.",
        type: "success",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      },
      {
        id: "2",
        title: "Request Approved",
        message: "Your request for price change has been approved.",
        type: "success",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
      },
      {
        id: "3",
        title: "Low Stock Alert",
        message: "Premium Hoodie is running low on stock (5 remaining).",
        type: "warning",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: false,
      },
      {
        id: "4",
        title: "Payout Processed",
        message: "Your monthly payout of $1,250.00 has been processed.",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);

    // Simulate receiving a new notification after 10 seconds
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "New Product Request",
        message:
          "Your request for a new product has been received and is under review.",
        type: "info",
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show toast notification
      toast(newNotification.title, {
        description: newNotification.message,
        action: {
          label: "View",
          onClick: () => setOpen(true),
        },
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);

    toast.success("All notifications marked as read");
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const notification = prev.find((n) => n.id === id);
      const newNotifications = prev.filter((n) => n.id !== id);

      // Update unread count if we're removing an unread notification
      if (notification && !notification.read) {
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      }

      return newNotifications;
    });

    toast.info("Notification dismissed");
  };

  // Get icon based on notification type
  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case "warning":
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />;
      case "error":
        return <div className="h-2 w-2 rounded-full bg-red-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs font-normal"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "relative flex flex-col gap-1 border-b p-4 transition-colors",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {getTypeIcon(notification.type)}
                    <h4 className="text-sm font-medium">
                      {notification.title}
                    </h4>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="absolute right-2 top-2 flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
