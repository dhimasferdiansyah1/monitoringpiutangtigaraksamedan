import type { Metadata } from "next";
import NavbarDashboard from "@/components/(dashboard)/NavbarDashboard";
import "@/app/(landingPage)/globals.css";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Monitoring Piutang",
    template: "%s - Tigaraksa Satria Medan",
  },
  description: "Monitoring Piutang",
};


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarDashboard />
            <div className="min-h-screen">{children}</div>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
