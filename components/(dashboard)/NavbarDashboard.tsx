"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlignRight,
  ChevronDown,
  ShoppingCart,
  X,
  ActivitySquare,
  Store,
  BarChartHorizontal,
  AlertTriangle,
  BadgeCheck,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "../(landingPage)/ThemeToggle";

const NavbarDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const mainRoutes = [
    { href: "/", label: "Landingpage" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const extraRoutes = [
    {
      icon: <HelpCircle className="h-4 w-4" />,
      href: "/dashboard/help",
      label: "Help",
    },
    {
      href: "/dashboard/karyawan",
      label: "Karyawan",
    },
  ];

  const secondaryRoutes = [
    {
      href: "/dashboard/main",
      icon: <ActivitySquare className="h-4 w-4" />,
      label: "Main monitoring",
    },
    {
      href: "/dashboard/customer",
      icon: <Store className="h-4 w-4" />,
      label: "Customer",
    },
    {
      href: "/dashboard/statusserah",
      icon: <BarChartHorizontal className="h-4 w-4" />,
      label: "Status Serah",
    },
  ];

  const thirdRoutes = [
    {
      href: "dashboard/jatuhtempo",
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Jatuh tempo",
    },
    {
      href: "dashboard/piutangselesai",
      icon: <BadgeCheck className="h-4 w-4" />,
      label: "Piutang selesai",
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-20  border-b bg-opacity-70 p-3 backdrop-blur-md lg:p-1">
        <div className="mx-auto max-w-7xl">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-bold duration-300 hover:text-muted-foreground hover:duration-300 lg:text-lg"
                >
                  <Image
                    src="/logo.webp"
                    alt="Logo Pt. Tigaraksa Satria, Tbk"
                    width={20}
                    height={20}
                    className="h-auto w-auto"
                  />
                  Monitoring Piutang
                </Link>
              </div>
              <div className="hidden items-center gap-6 lg:flex">
                <div className="flex gap-6">
                  {extraRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`flex items-center gap-1.5 text-sm transition-colors hover:text-primary ${
                        pathname === route.href
                          ? " font-medium text-black dark:text-white"
                          : " font-medium text-muted-foreground"
                      }`}
                    >
                      {route.label} {route.icon}
                    </Link>
                  ))}
                </div>
                <div className=" h-5 border"></div>
                {mainRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm transition-colors hover:text-primary ${
                      pathname === route.href
                        ? " font-medium text-black dark:text-white"
                        : " font-medium text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
                <a
                  href="https://www.tigaraksa.co.id/"
                  target="_blank"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Perusahaan
                </a>
                <ModeToggle />
              </div>
              <div className="flex items-center lg:hidden">
                <motion.button
                  id="hamburgermenu"
                  aria-label="hamburgermenu"
                  name="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X /> : <AlignRight />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <div className="overflow-y-scroll">
            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-full border-r bg-white transition-all dark:bg-black sm:w-80 lg:hidden"
              initial={{ x: "-100%" }} // Adjust initial position for full-width menu
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className="mb-1 mr-3 mt-3 flex items-center justify-end gap-4 rounded-lg p-2">
                <ModeToggle />
                <X
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 cursor-pointer rounded-md border hover:scale-75 hover:duration-75"
                />
              </div>
              <nav>
                <ul className="flex flex-col gap-3 px-6">
                  {/* Other top-level links */}
                  <li className="flex flex-col gap-3">
                    {/* Master heading with bold text and chevron down */}
                    <Link
                      href="/dashboard"
                      className="flex cursor-pointer items-center gap-2 text-lg font-bold "
                    >
                      <Image
                        src="/logo.webp"
                        alt="Logo Pt. Tigaraksa Satria, Tbk"
                        width={20}
                        height={20}
                        className="h-auto w-auto"
                        priority
                      />
                      Monitoring Piutang
                    </Link>
                  </li>
                  <ul
                    className="ml-6 max-h-0 space-y-2 overflow-hidden transition duration-200"
                    style={{ maxHeight: isOpen ? "500px" : 0 }}
                  >
                    {mainRoutes.map((route) => (
                      <Link
                        key={route.href}
                        onClick={() => setIsOpen(false)}
                        href={route.href}
                        className={`dark:text-white" flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:bg-gray-100 hover:text-black ${
                          pathname === route.href
                            ? "font-bold text-black"
                            : "text-muted-foreground"
                        }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </ul>

                  {/* Master heading with bold text and chevron down */}
                  <li className="ml-9 flex cursor-pointer items-center justify-between text-lg font-bold">
                    Monitoring menu
                    <ChevronDown size={16} className="ml-2" />
                  </li>
                  {/* Nested list for Master items: */}
                  <ul
                    className="ml-14 max-h-0 space-y-2 overflow-hidden transition duration-200"
                    style={{ maxHeight: isOpen ? "500px" : 0 }}
                  >
                    {secondaryRoutes.map((route) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        key={route.href}
                        href={route.href}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:bg-gray-100 hover:text-black "
                      >
                        {route.label}
                      </Link>
                    ))}
                  </ul>
                </ul>
              </nav>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
      <div className="hidden items-center justify-center gap-8 border-b p-5 lg:flex">
        <div className="hidden items-center gap-10 lg:flex">
          {secondaryRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                pathname === route.href
                  ? " font-medium text-black dark:text-white"
                  : "font-medium text-muted-foreground"
              }`}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </div>
        <div className="h-5 border"></div>
        <div className="hidden items-center gap-10 lg:flex">
          {thirdRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                pathname === route.href
                  ? " font-medium text-black dark:text-white"
                  : "font-medium text-muted-foreground"
              }`}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarDashboard;
