"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function PemegangDokumen() {
  const pemegangDokumenRoutes = [
    { href: "/dashboard", label: "Semua" },
    { href: "/dashboard/pemegangdokumen/sales", label: "Sales" },
    { href: "/dashboard/pemegangdokumen/adminsales", label: "Admin Sales" },
    {
      href: "/dashboard/pemegangdokumen/admingudang",
      label: "Admin Gudang",
    },
    {
      href: "/dashboard/pemegangdokumen/driver",
      label: "Driver",
    },
    {
      href: "/dashboard/pemegangdokumen/admininkaso",
      label: "Admin Inkaso",
    },
    {
      href: "/dashboard/pemegangdokumen/kolektor",
      label: "Kolektor",
    },
    {
      href: "/dashboard/pemegangdokumen/kasir",
      label: "Kasir",
    },
  ];
  const pathname = usePathname();
  return (
    <div
      className="lg:flex-row flex justify-center mt-4 flex-wrap max-w-fit gap-1 "
      key="i"
    >
      {pemegangDokumenRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`transition-colors px-3 py-2 pr-14 border rounded-md ${
            pathname === route.href
              ? "bg-zinc-100 text-black dark:text-white dark:bg-zinc-800"
              : " text-muted-foreground hover:bg-zinc-50"
          }`}
        >
          {pathname === route.href ? (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-800/50 mr-2"></span>
          ) : (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-200 mr-2"></span>
          )}
          {route.label}
        </Link>
      ))}
    </div>
  );
}
