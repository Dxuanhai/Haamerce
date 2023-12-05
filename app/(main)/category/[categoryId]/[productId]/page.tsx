import Link from "next/link";
import React from "react";
import { ArrowRightIcon, ChevronRight, LucideHome } from "lucide-react";

import getProduct from "@/actions/get-product";

import ProductList from "@/components/productList";
import getProducts from "@/actions/get-products";
import ProductDetail from "@/components/productDetal";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { categoryId: string; productId: string };
}
async function page({ params }: Props) {
  const product = await getProduct(params.productId);

  const products = await getProducts({ categoryId: params.categoryId });
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="py-4 flex gap-x-2 items-center justify-start text-[10px] md:text-base">
        <Link href="/" className="font-bold">
          <LucideHome className="h-6 w-6" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <p className="font-bold">{product?.category?.name}</p>
        <ChevronRight className="h-4 w-4" />
        <p className="italic">{product.name}</p>
      </div>
      <Separator />
      <div className="mt-[40px]">
        <ProductDetail product={product} />
      </div>
      <div className="mt-[60px]">
        <ProductList
          products={products}
          title={`${product.category.name} Category`}
        />
      </div>
    </section>
  );
}

export default page;
