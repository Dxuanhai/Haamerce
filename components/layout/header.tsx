import Link from "next/link";
import Navbar from "./navbar";
import Scroll from "../items/Scroll";

function Header() {
  return (
    <>
      <Scroll classname="bottom-[80px]" />
      <header className="border-b  sticky top-0 bg-slate-50 dark:bg-[#262629] z-50">
        <div className="px-4 z-50 sm:px-6 lg:px-8 flex h-20 items-center justify-start gap-4 ">
          <Link href="/" className="ml-4 flex lg:ml-0 ">
            <p className="font-bold text-[42px] dark:text-white">Haamerce</p>
          </Link>
          <Navbar />
        </div>
      </header>
    </>
  );
}

export default Header;
