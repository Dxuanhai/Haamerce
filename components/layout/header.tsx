import Link from "next/link";
import Navbar from "./navbar";

function Header() {
  return (
    <header className="border-b">
      <div className="relative px-4 z-50 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-3xl dark:text-white">Haamerce</p>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
