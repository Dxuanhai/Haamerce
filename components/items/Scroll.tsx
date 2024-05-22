"use client";
import { ArrowBigUpDash } from "lucide-react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  classname?: string;
}
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const Scroll = ({ classname }: Props) => {
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScroll]);

  return (
    <div
      onClick={handleScrollTop}
      className={twMerge(
        "hidden",
        "w-[40px]",
        "h-[40px]",
        "items-center",
        "justify-center",
        "text-slate-700 dark:text-[#c59f60]",
        "bg-white dark:bg-[#020817]",
        "fixed",

        "right-4",
        "bottom-[40px]",
        "z-[999]",
        "cursor-pointer",
        "rounded-md",
        "xl:hover:bg-[#e2e8f0] xl:dark:hover:bg-[#1e293b]",
        "border-[1px] ",

        isScroll ? "xl:flex " : "",
        classname
      )}
    >
      <ArrowBigUpDash />
    </div>
  );
};

export default Scroll;
