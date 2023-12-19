import Link from "next/link";
import React from "react";
import { ArrowRightIcon, ChevronRight, LucideHome } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import getProduct from "@/actions/get-product";

import ProductList from "@/components/productList";
import getProducts from "@/actions/get-products";
import ProductDetail from "@/components/productDetal";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { productId: string; categoryId: string };
  searchParams: {
    [key: string]: string[] | undefined;
  };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const temp = params.productId.split(".html") ?? [];
  const id = temp[0]?.split("_");

  // fetch data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id[id.length - 1]}`
  ).then((res) => res.json());

  return {
    title: `Haamerce | ${res.name}`,

    openGraph: {
      title: `Haamerce | ${res.name}`,
      description: ` ${res.name}`,
      type: "website",
      images: [
        `https://github.com/Dxuanhai/Haamerce/blob/main/public/logoHaamerce.png?raw=true`,
      ],
    },
  };
}

async function page({ params }: Props) {
  const temp = params.productId.split(".html") ?? [];
  const productId = temp[0]?.split("_");
  const temp2 = params.categoryId.split(".html") ?? [];
  const categoryId = temp2[0]?.split("_");
  const product = await getProduct(productId[productId.length - 1]);

  const products = await getProducts({
    isFeatured: true,
    skip: ["0"],
    take: ["4"],
  });
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="py-4 flex gap-x-2 items-center justify-start text-[10px] md:text-base">
        <Link href="/" className="font-bold">
          <LucideHome className="h-6 w-6" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/category/${categoryId[categoryId.length - 1]}`}
          className="font-bold text-base w-[80px]  "
        >
          {product?.category?.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <p className="italic text-sm">{product.name}</p>
      </div>
      <Separator />
      <div className="mt-[40px]">
        <ProductDetail product={product} />
      </div>
      <div className="mt-[60px]">
        <ProductList products={products} title="BEST SELLERS" />
      </div>
    </section>
  );
}

export default page;
