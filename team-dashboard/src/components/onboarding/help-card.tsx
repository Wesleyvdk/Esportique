"use client";

import { HelpCircle, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";

export function OnboardingHelpCard() {
  const { startOnboarding, isFirstTimeUser } = useOnboarding();

  // Don't show this card if the user is a first-time user (they'll see the welcome modal instead)
  if (isFirstTimeUser) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Need Help Getting Started?
        </CardTitle>
        <CardDescription>
          Take a guided tour to learn about all the features of your team
          dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={startOnboarding}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Start Guided Tour
        </Button>
      </CardContent>
    </Card>
  );
}
