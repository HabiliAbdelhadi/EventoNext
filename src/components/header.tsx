"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "./logo";

const routes = [
  { name: "Home", href: "/" },
  { name: "All Events", href: "/events/all" },
];
export default function Header() {
  const activePathName = usePathname();
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-white/10 px-3  sm:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="flex h-full gap-6 text-sm">
          {routes.map((route) => (
            <li
              key={route.href}
              className={cn(
                "relative flex items-center transition hover:text-white",
                {
                  "text-white": activePathName === route.href,
                  "text-white/50": activePathName !== route.href,
                },
              )}
            >
              <Link href={route.href}>{route.name}</Link>
              {activePathName === route.href && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent absolute bottom-0 h-1 w-full"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
