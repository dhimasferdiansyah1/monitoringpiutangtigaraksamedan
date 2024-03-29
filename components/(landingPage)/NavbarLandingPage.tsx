"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, AlignJustifyIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";

export default function NavbarLandingPage() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const routes = [{ href: "/about", labels: "About" }];

  return (
    <>
      <nav className="sticky top-0 bg-opacity-70 p-3 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="container">
            <div className="flex justify-between">
              <div className="flex">
                <Link
                  href="/"
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
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm transition-colors hover:text-primary ${
                      pathname === route.href
                        ? " text-black dark:text-white"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    {route.labels}
                  </Link>
                ))}
                {userId == null && (
                  <Link
                    href="/sign-in"
                    className={`text-sm transition-colors hover:text-primary ${
                      pathname === "/login"
                        ? " text-black dark:text-white"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    Login
                  </Link>
                )}
                <ModeToggle />
                <div className="hidden lg:flex gap-2 items-center">
                  <UserButton />
                  <p className="text-muted-foreground">{user?.username}</p>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X /> : <AlignJustifyIcon />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-full border-r bg-white transition-all dark:bg-black sm:w-80 lg:hidden"
              initial={{ x: "-200%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-200%" }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className="mb-1 mr-3 mt-3 flex items-center justify-end gap-4 rounded-lg p-2">
                <ModeToggle />
                <div className="flex lg:hidden gap-2 items-center">
                  <UserButton />
                  <p className="text-muted-foreground">{user?.username}</p>
                </div>
                <X
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 cursor-pointer rounded-md border hover:scale-75 hover:duration-75"
                />
              </div>
              <ul className="flex flex-col px-6">
                <li className="mb-3 flex gap-2">
                  <Activity />
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/"
                    className={`dark:text-white" flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:bg-gray-100 hover:text-black ${
                      pathname === "/"
                        ? "font-bold text-black"
                        : "text-muted-foreground"
                    }`}
                  >
                    Monitoring Piutang
                  </Link>
                </li>
                {routes.map((route) => (
                  <li key={route.href} className="mb-3 ml-8">
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={route.href}
                      className={`text-base font-medium text-muted-foreground hover:text-black dark:text-white ${
                        pathname === route.href
                          ? "font-bold text-black"
                          : "text-muted-foreground"
                      }`}
                    >
                      {route.labels}
                    </Link>
                  </li>
                ))}
                <li className="mb-3 ml-8">
                  {userId == null && (
                    <Link
                      href="/sign-in"
                      className={`text-base font-medium text-muted-foreground hover:text-black dark:text-white ${
                        pathname === "/login"
                          ? " text-black dark:text-white"
                          : "font-medium text-muted-foreground"
                      }`}
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
