"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bell, Check, Globe, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-context";

export default function SettingsPage() {
  const { teamData } = useAuth();

  // If no team data, show loading state
  if (!teamData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6">
        <NotificationSettings />
        <PrivacySettings />
        <LanguageSettings />
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    productUpdates: true,
    marketingEmails: false,
    requestUpdates: true,
    payoutNotifications: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Notification settings updated", {
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your settings. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Manage how you receive notifications and updates
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="orderNotifications">Order Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new orders are placed
              </p>
            </div>
            <Switch
              id="orderNotifications"
              checked={settings.orderNotifications}
              onCheckedChange={() => handleToggle("orderNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="productUpdates">Product Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your products are updated
              </p>
            </div>
            <Switch
              id="productUpdates"
              checked={settings.productUpdates}
              onCheckedChange={() => handleToggle("productUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requestUpdates">Request Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your requests are approved or rejected
              </p>
            </div>
            <Switch
              id="requestUpdates"
              checked={settings.requestUpdates}
              onCheckedChange={() => handleToggle("requestUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="payoutNotifications">Payout Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when payouts are processed
              </p>
            </div>
            <Switch
              id="payoutNotifications"
              checked={settings.payoutNotifications}
              onCheckedChange={() => handleToggle("payoutNotifications")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketingEmails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive promotional emails and newsletters
              </p>
            </div>
            <Switch
              id="marketingEmails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Notification Settings
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function PrivacySettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    publicProfile: true,
    showRevenue: false,
    showOrders: true,
    dataCollection: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Privacy settings updated", {
        description: "Your privacy preferences have been saved.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your settings. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control your data and privacy preferences
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="publicProfile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your team profile visible to the public
              </p>
            </div>
            <Switch
              id="publicProfile"
              checked={settings.publicProfile}
              onCheckedChange={() => handleToggle("publicProfile")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showRevenue">Show Revenue</Label>
              <p className="text-sm text-muted-foreground">
                Display your revenue statistics publicly
              </p>
            </div>
            <Switch
              id="showRevenue"
              checked={settings.showRevenue}
              onCheckedChange={() => handleToggle("showRevenue")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showOrders">Show Orders</Label>
              <p className="text-sm text-muted-foreground">
                Display your order statistics publicly
              </p>
            </div>
            <Switch
              id="showOrders"
              checked={settings.showOrders}
              onCheckedChange={() => handleToggle("showOrders")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataCollection">Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect usage data to improve your experience
              </p>
            </div>
            <Switch
              id="dataCollection"
              checked={settings.dataCollection}
              onCheckedChange={() => handleToggle("dataCollection")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Privacy Settings
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function LanguageSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Language settings updated", {
        description: "Your language and timezone preferences have been saved.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description:
          "There was an error updating your settings. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Language & Region
        </CardTitle>
        <CardDescription>
          Set your preferred language and timezone
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
              <option value="Australia/Sydney">Sydney</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Language Settings
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
