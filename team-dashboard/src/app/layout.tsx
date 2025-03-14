import type React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Esportique - Team Dashboard",
  description: "Manage your team's products, sales, and revenue on Esportique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
