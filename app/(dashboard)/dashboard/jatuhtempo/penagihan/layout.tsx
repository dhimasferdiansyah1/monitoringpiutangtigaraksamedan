"use client";
import type { Metadata } from "next";
import "@/app/(landingPage)/globals.css";
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

const jatuhTempoPenagihanRoutes = [
  { href: "/dashboard/jatuhtempo/penagihan", label: "Hari ini/lewat" },
  { href: "/dashboard/jatuhtempo/penagihan/besok", label: "besok" },
  {
    href: "/dashboard/jatuhtempo/penagihan/satuminggu",
    label: "Satu minggu",
  },
  {
    href: "/dashboard/jatuhtempo/penagihan/semua",
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
        <div className="flex w-full justify-center">
          <div className="lg:flex-row flex justify-center mt-4 flex-wrap max-w-fit gap-1 ">
            {jatuhTempoPenagihanRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`transition-colors px-3 py-2 pr-10 border hover:duration-300 duration-300 rounded-md ${
                  pathname === route.href
                    ? "bg-zinc-100 text-black dark:text-white dark:bg-zinc-800"
                    : " text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 "
                }`}
              >
                {pathname === route.href ? (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400/75 mr-2"></span>
                ) : (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-200 mr-2"></span>
                )}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
