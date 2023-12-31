"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.name}_${route.id}.html`,
    label: route.name,
    active: pathname === `/category/${route.name}_${route.id}.html`,
  }));

  return (
    <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-lg font-medium transition-colors hover:opacity-30",
            route.active
              ? "dark:text-zinc-200 font-bold"
              : "text-neutral-500 dark:text-neutral-400"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
