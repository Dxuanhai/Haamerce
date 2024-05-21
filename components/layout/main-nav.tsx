"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <>
      {isMenuOpen && (
        <div
          className="absolute top-full left-0 px-12 w-full h-[440px] py-10 bg-slate-50 dark:bg-[#262629] menu-dropdown flex"
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="flex-grow-0 flex-shrink-0 w-3/12 mr-6">
            <div className="flex flex-col gap-4 text-2xl">
              <Link href="@" className="hover:opacity-70">
                HÀNG MỚI VỀ
              </Link>
              <Link href="@" className="hover:opacity-70">
                BÁN CHẠY NHẤT
              </Link>
              <Link href="@" className="hover:opacity-70">
                ARTISANAL DELICATE
              </Link>
            </div>
          </div>
          <div className="flex-grow flex-shrink flex-col gap-6 w-full">
            <div className="grid grid-cols-4 gap-10 h-full w-full">
              <Link
                href={routes[0].href}
                className="relative h-full group hover:rounded-t-md overflow-hidden"
                onMouseLeave={() => setHoverIndex(-1)}
                onMouseEnter={() => setHoverIndex(0)}
              >
                <div
                  className={`absolute inset-0 w-full h-full z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                />

                {hoverIndex === 0 && (
                  <div
                    className={`absolute left-1/2 top-3/4 z-20 tracking-wide -translate-x-[70%] -translate-y-[50%] font-bold text-xl text-white transition-all duration-300`}
                  >
                    DOANH MỤC
                    <p className="text-black ">{routes[0].label}</p>
                  </div>
                )}
                <div
                  className={`absolute bottom-0 z-20 bg-slate-50 dark:bg-[#262629] h-4 w-full translate-y-0 transition-all duration-300 ${
                    hoverIndex === 0 && " translate-y-[100%]"
                  }`}
                ></div>
                <Image
                  alt="sdsd"
                  src="/shirt_cate.jpg"
                  fill
                  className="object-cover"
                />
              </Link>
              <Link
                href={routes[1].href}
                className="relative h-full group hover:rounded-t-md overflow-hidden"
                onMouseLeave={() => setHoverIndex(-1)}
                onMouseEnter={() => setHoverIndex(1)}
              >
                <div
                  className={`absolute inset-0 w-full h-full z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                />

                {hoverIndex === 1 && (
                  <div
                    className={`absolute left-1/2  top-1/4 z-20 tracking-wide -translate-x-[30%] -translate-y-[50%] font-bold text-xl text-white transition-all duration-300 text-right flex flex-col items-end`}
                  >
                    <span>DOANH MỤC</span>
                    <span className="text-black text-2xl">
                      {routes[1].label}
                    </span>
                  </div>
                )}
                <div
                  className={`absolute top-0 z-20 bg-slate-50 dark:bg-[#262629] h-4 w-full  translate-y-0 transition-all duration-300 ${
                    hoverIndex === 1 && "translate-y-[-100%]"
                  }`}
                ></div>
                <Image
                  alt="sdsd"
                  src="/dress_cate.jpg"
                  fill
                  className="object-cover"
                />
              </Link>
              <Link
                href={routes[2].href}
                className="relative h-full group hover:rounded-t-md overflow-hidden"
                onMouseLeave={() => setHoverIndex(-1)}
                onMouseEnter={() => setHoverIndex(2)}
              >
                <div
                  className={`absolute inset-0 w-full h-full z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                />

                {hoverIndex === 2 && (
                  <div
                    className={`absolute left-1/2 top-3/4 z-20 tracking-wide -translate-x-[70%] -translate-y-[50%] font-bold text-xl text-white transition-all duration-300`}
                  >
                    DOANH MỤC
                    <p className="text-black ">{routes[2].label}</p>
                  </div>
                )}
                <div
                  className={`absolute bottom-0 z-20 bg-slate-50 dark:bg-[#262629] h-4 w-full translate-y-0 transition-all duration-300 ${
                    hoverIndex === 2 && "translate-y-[100%] "
                  }`}
                ></div>
                <Image
                  alt="sdsd"
                  src="/skirt_cate.jpg"
                  fill
                  className="object-cover"
                />
              </Link>
              <Link
                href={routes[3].href}
                className="relative h-full group hover:rounded-t-md overflow-hidden"
                onMouseLeave={() => setHoverIndex(-1)}
                onMouseEnter={() => setHoverIndex(3)}
              >
                <div
                  className={`absolute inset-0 w-full h-full z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                />

                {hoverIndex === 3 && (
                  <div
                    className={`absolute left-1/2  top-1/4 z-20 tracking-wide -translate-x-[30%] -translate-y-[50%] font-bold text-xl text-white transition-all duration-300 text-right flex flex-col items-end`}
                  >
                    <span>DOANH MỤC</span>
                    <span className="text-black  text-2xl">
                      {routes[3].label}
                    </span>
                  </div>
                )}
                <div
                  className={`absolute top-0 z-20 bg-slate-50 dark:bg-[#262629] h-4 w-full  translate-y-0 transition-all duration-300 ${
                    hoverIndex === 3 && "translate-y-[-100%]"
                  }`}
                ></div>
                <Image
                  alt="sdsd"
                  src="/trousesr_cate.jpg"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
      <nav className="mx-6 hidden xl:flex items-center space-x-4 lg:space-x-6 ">
        <div
          className="flex gap-2 items-center justify-start cursor-pointer"
          onMouseEnter={() => setIsMenuOpen(true)}
        >
          <span className="font-bold">SẢN PHẨM </span> <ChevronDown />
        </div>
      </nav>
    </>
  );
};

export default MainNav;
