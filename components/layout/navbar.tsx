import MainNav from "@/components/layout/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "../items/navbarAction";

import MainNavMB from "./main-nav-mb";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className=" flex justify-between items-center w-full h-full  z-auto ">
      <MainNav data={categories} />
      <NavbarActions />
      <MainNavMB data={categories} />
    </div>
  );
};

export default Navbar;
