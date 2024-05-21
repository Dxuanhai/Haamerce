"use client";
import MainNav from "@/components/layout/main-nav";
import NavbarActions from "../items/navbarAction";
import MainNavMB from "./main-nav-mb";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className=" flex justify-between items-center w-full h-full  z-auto ">
      <MainNav data={categories} />
      <NavbarActions />
      <MainNavMB data={categories} />
    </div>
  );
};

export default Navbar;
