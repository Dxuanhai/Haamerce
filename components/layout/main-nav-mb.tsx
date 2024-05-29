"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "../ui/separator";

interface Props {
  data: Category[];
}

function MainNavMB({ data }: Props) {
  const pathname = usePathname();
  const [isDropdown, setIsDropdown] = useState(true);
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  return (
    <>
      <div className="drawer drawer-end xl:hidden ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4">
            <Menu className="h-9 w-9 ml-auto xl:hidden" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-white dark:bg-[#1d131c]  pt-[80px] font-bold">
            <div className="flex flex-col gap-y-2">
              <div
                className="flex justify-between items-center   "
                onClick={() => setIsDropdown(!isDropdown)}
              >
                <span className="font-bold">SẢN PHẨM </span>
                <ChevronDown className="  " size={32} />
              </div>
              {isDropdown && (
                <div className="flex flex-col gap-y-2 font-normal">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="font-normal text-sm"
                    >
                      {route.label}
                    </Link>
                  ))}
                  <Link href="/" className="hover:opacity-70">
                    HÀNG MỚI VỀ
                  </Link>
                  <Link href="/" className="hover:opacity-70">
                    BÁN CHẠY NHẤT
                  </Link>
                  <Link href="/" className="hover:opacity-70">
                    ARTISANAL DELICATE
                  </Link>
                </div>
              )}
              <div>ĐÃ MUA</div>
              <div>VỀ CHÚNG TÔI</div>
            </div>
            <Separator className="mt-[20px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainNavMB;
