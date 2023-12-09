import getProducts from "@/actions/get-products";
import Link from "next/link";
import React from "react";
import { ChevronRight, LucideHome } from "lucide-react";

import ProductList from "@/components/productList";
import { Separator } from "@/components/ui/separator";
import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";

interface Props {
  params: { categoryId: string };
}
async function page({ params }: Props) {
  const products = await getProducts({ categoryId: params.categoryId });
  const billboard = await getBillboard("6d23e6fe-b712-46da-afc3-667b941ea209");
  return (
    <section className="p-4 sm:p-6 lg:p-8 ">
      <div className="py-4 flex gap-x-2 items-center justify-start  font-bold">
        <Link href="/" className="font-bold">
          <LucideHome className="h-6 w-6" />
        </Link>
        <ChevronRight className="h-4 w-4 " />
        {products[0]?.category?.name}
      </div>
      <Separator />
      <Billboard data={billboard} />
      <ProductList products={products} />
    </section>
  );
}

export default page;
