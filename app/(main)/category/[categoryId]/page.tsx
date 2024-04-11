import getProducts from "@/actions/get-products";
import Link from "next/link";
import React from "react";
import { ChevronRight, LucideHome } from "lucide-react";
import ProductList from "@/components/productList";
import Filterbar from "@/components/filters/filter-bar";
import getColors from "@/actions/get-colors";

interface Props {
  params: { categoryId: string };
  searchParams: {
    [key: string]: string[] | undefined;
  };
}

async function page({ params, searchParams }: Props) {
  const temp = params.categoryId.split(".html");
  const id = temp[0].split("_");

  const selectedColors = searchParams.colors || undefined;
  const min = searchParams.min || ["0"];
  const max = searchParams.max || ["10000000"];
  const page = searchParams.page || ["1"];
  const take = 8;
  const skip = (Number(page) - 1) * Number(take);
  const products = await getProducts({
    colors: selectedColors,
    categoryId: id[id.length - 1],
    min,
    max,
    skip: [skip.toString()],
    take: [take.toString()],
  });
  const colorsData = await getColors();

  return (
    <section className="p-4 sm:p-6 lg:p-8 ">
      <div className="py-4 flex gap-x-2 items-center justify-start  font-bold">
        <Link href="/" className="font-bold">
          <LucideHome className="h-6 w-6" />
        </Link>
        <ChevronRight className="h-4 w-4 " />
        {products[0]?.category?.name}
      </div>

      <div className="flex">
        <Filterbar
          data={colorsData}
          queryString={selectedColors}
          id={id[id.length - 1]}
        />
        <ProductList products={products} />
      </div>
      <div className="w-full flex justify-center items-center my-4"></div>
    </section>
  );
}

export default page;
