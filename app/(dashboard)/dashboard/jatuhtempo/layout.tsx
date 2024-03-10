"use client";
import type { Metadata } from "next";
import "@/app/(landingPage)/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const metadata: Metadata = {
  title: {
    default: "Monitoring Piutang",
    template: "Monitoring Piutang",
  },
  description: "PT. Tigaraksa Satria, Tbk Cabang Medan",
};

const jatuhTempoRoutes = [
  { href: "/dashboard/jatuhtempo", label: "Hari ini/lewat" },
  { href: "/dashboard/jatuhtempo/besok", label: "besok" },
  {
    href: "/dashboard/jatuhtempo/satuminggu",
    label: "Satu minggu",
  },
  {
    href: "/dashboard/jatuhtempo/semua",
    label: "Semua",
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl w-full mx-auto">
        <div className="lg:flex-row flex justify-center lg:gap-4 mt-4 flex-wrap">
          {jatuhTempoRoutes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant="outline"
                className={`transition-colors ${
                  pathname === route.href
                    ? "bg-zinc-100 text-black dark:text-white dark:bg-zinc-800"
                    : " text-muted-foreground"
                }`}
              >
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
