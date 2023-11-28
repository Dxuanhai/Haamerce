import Link from "next/link";

import MainNav from "@/components/layout/main-nav";

//import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-3xl dark:text-white">Haamerce</p>
        </Link>
        <MainNav data={categories} />

        {/* <NavbarActions /> */}
      </div>
    </div>
  );
};

export default Navbar;
