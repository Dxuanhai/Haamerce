import getProducts from "@/actions/get-products";
import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import Section from "@/components/productList";
import ProductList from "@/components/productList";

interface Props {
  params: { categoryId: string };
}
async function page({ params }: Props) {
  const products = await getProducts({ categoryId: params.categoryId });

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="py-4 flex gap-x-2 items-center justify-start  mb-[40px]">
        <Link href="/">Home</Link>
        <ArrowRightIcon className="h-4 w-4" />
        {products[0]?.category?.name}
      </div>
      <ProductList products={products} />
    </section>
  );
}

export default page;
