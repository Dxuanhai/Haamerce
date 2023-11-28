import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "lucide-react";

import getProduct from "@/actions/get-product";
import Image from "next/image";
import ProductItems from "@/components/productItems";

interface Props {
  params: { categoryId: string; productId: string };
}
async function page({ params }: Props) {
  const product = await getProduct(params.productId);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="py-4 flex gap-x-2 items-center justify-start mb-[40px] text-[10px] md:text-base">
        <Link href="/">Home</Link>
        <ArrowRightIcon className="h-4 w-4" />
        <p>{product?.category?.name}</p>
        <ArrowRightIcon className="h-4 w-4" />
        <p className="italic">{product.name}</p>
      </div>
      <ProductItems product={product} />
    </section>
  );
}

export default page;
