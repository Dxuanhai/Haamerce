"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  data: Category[];
}

function MainNavMB({ data }: Props) {
  const [onNav, setOnNav] = useState(false);
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  return (
    <>
      <Menu
        className="h-9 w-9 ml-auto xl:hidden"
        onClick={() => setOnNav(!onNav)}
      />
      {onNav && (
        <nav
          className={cn(
            "py-[20px] absolute top-12 -right-4 z-20 xl:hidden flex flex-col items-center gap-y-2 w-[100vw] bg-slate-50 dark:bg-[#262629]  dark:text-[#c59f60] text-slate-800",
            "slide-down"
          )}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-2xl font-medium transition-colors hover:opacity-30 tracking-wider",
                route.active
                  ? "dark:text-zinc-200 font-bold"
                  : "text-neutral-500 dark:text-neutral-400"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

export default MainNavMB;
