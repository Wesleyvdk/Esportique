import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { SupportChat } from "@/components/dashboard/support-chat";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { OnboardingProvider } from "@/lib/onboarding-context";
import { OnboardingTooltip } from "@/components/onboarding/onboarding-tooltip";
import { WelcomeModal } from "@/components/onboarding/welcome-modal";
import { CompletionScreen } from "@/components/onboarding/completion-screen";
import { OnboardingProgress } from "@/components/onboarding/progress-indicator";

export const metadata = {
  title: "Team Dashboard | Esportique",
  description: "Manage your team's products, sales, and revenue on Esportique",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <OnboardingProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
              {children}
            </main>
          </div>
          <SupportChat />
          <Toaster richColors />

          {/* Onboarding Components */}
          <WelcomeModal />
          <OnboardingTooltip />
          <CompletionScreen />
          <OnboardingProgress />
        </div>
      </OnboardingProvider>
    </ThemeProvider>
  );
}
