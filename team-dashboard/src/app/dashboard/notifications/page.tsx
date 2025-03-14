import { cookies } from "next/headers";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock function to get notifications
async function getNotifications() {
  const token = (await cookies()).get("team_token")?.value;

  if (!token) {
    return [];
  }

  // In a real app, you would fetch from your API
  // This is mock data
  return [
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
    {
      id: "5",
      title: "New Feature Available",
      message:
        "You can now request discounts for your products through the dashboard.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
    },
  ];
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unreadNotifications.length > 0 && (
          <form>
            <Button type="submit" variant="outline">
              Mark all as read
            </Button>
          </form>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All
            <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">
              {notifications.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">
              {unreadNotifications.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="read">
            Read
            <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">
              {readNotifications.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <NotificationList notifications={notifications} />
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          {unreadNotifications.length > 0 ? (
            <NotificationList notifications={unreadNotifications} />
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No unread notifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="read" className="mt-4">
          {readNotifications.length > 0 ? (
            <NotificationList notifications={readNotifications} />
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No read notifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationList({ notifications }: { notifications: any }) {
  // Get icon based on notification type
  const getTypeIcon = (type: any) => {
    switch (type) {
      case "success":
        return <div className="h-3 w-3 rounded-full bg-green-500" />;
      case "warning":
        return <div className="h-3 w-3 rounded-full bg-yellow-500" />;
      case "error":
        return <div className="h-3 w-3 rounded-full bg-red-500" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-blue-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {notifications.map((notification: any) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 ${
                !notification.read ? "bg-muted/50" : ""
              }`}
            >
              <div className="mt-1">{getTypeIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
              <div className="flex gap-1">
                {!notification.read && (
                  <form>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  </form>
                )}
                <form>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
