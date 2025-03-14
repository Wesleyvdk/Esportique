"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnboarding } from "@/lib/onboarding-context";

export function WelcomeModal() {
  const { isFirstTimeUser, startOnboarding, skipOnboarding } = useOnboarding();

  useEffect(() => {
    // Add the welcome element to the DOM for the onboarding tooltip to target
    if (isFirstTimeUser) {
      const welcomeElement = document.createElement("div");
      welcomeElement.id = "onboarding-welcome";
      welcomeElement.style.position = "fixed";
      welcomeElement.style.top = "50%";
      welcomeElement.style.left = "50%";
      welcomeElement.style.zIndex = "-1";
      document.body.appendChild(welcomeElement);

      return () => {
        document.body.removeChild(welcomeElement);
      };
    }
  }, [isFirstTimeUser]);

  if (!isFirstTimeUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-center text-2xl">
            Welcome to Your Team Dashboard
          </CardTitle>
          <CardDescription className="text-center">
            We're excited to have you on board! Let's get you started with your
            new dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Your dashboard is where you'll manage your team's products, track
            sales, and monitor revenue. Take a quick tour to learn about all the
            features available to you.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={startOnboarding}>
            Take the Tour
          </Button>
          <Button variant="outline" className="w-full" onClick={skipOnboarding}>
            Skip for Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
