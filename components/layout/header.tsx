"use client";
import Link from "next/link";
import Navbar from "./navbar";
import Scroll from "../items/Scroll";
import { useEffect, useState } from "react";
import Container from "../ui/container";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 90) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Scroll classname="bottom-[80px]" />

      <header
        className={`  bg-slate-50 sticky transition-all z-[100]  w-full h-[100px] dark:bg-[#262629]  ${
          isFixed ? "top-0 left-0  border-b-2 dark:border-none  h-[80px]  " : ""
        }  `}
      >
        <Container>
          <div className="px-4 z-50 sm:px-6 lg:px-8 flex h-20 items-center justify-start gap-4 ">
            <Link href="/" className="ml-4 flex lg:ml-0 ">
              <p
                className={`font-bold text-[36px]  md:text-[48px] ${
                  isFixed ? " text-[28px]  md:text-[48px]" : ""
                } dark:text-white transition-all`}
              >
                Haamerce
              </p>
            </Link>
            <Navbar />
          </div>
        </Container>
      </header>
      {isFixed && <div className="h-[80px] transition-all"></div>}
    </>
  );
};

export default Header;
