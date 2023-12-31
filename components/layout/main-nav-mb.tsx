"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { on } from "events";
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
      <Menu className="h-9 w-9 md:hidden" onClick={() => setOnNav(!onNav)} />
      {onNav && (
        <nav className="py-[20px] absolute top-12 -right-4 z-20  md:hidden flex flex-col items-center gap-y-2 w-[100vw]  bg-neutral-100 bg-gradient-to-b  dark:from-neutral-950 dark:via-slate-700 dark:to-neutral-950 dark:text-zinc-300 text-slate-800 ">
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
