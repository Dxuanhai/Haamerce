"use client";

import { Product } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ColorCard from "./colorCard";
import { formatterVND } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
interface Props {
  products: Product;
}

function ProductItem({ products }: Props) {
  const [currentColor, setCurrentColor] = useState(0);
  const handlechangeColor = (index: number) => {
    setCurrentColor(index);
  };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  searchParams.get("color") || null;
  const isCategoryPage = pathname.includes("category");
  const DetailProductPage = searchParams.get("color") || null;

  return (
    <div className="max-w-sm rounded relative w-full">
      <Link
        href={`${
          isCategoryPage
            ? `${
                DetailProductPage
                  ? `${products.id}?color=${products.productColors[0]?.color?.name}`
                  : `${products.category.id}/${products.id}?color=${products.productColors[0]?.color?.name}`
              }`
            : `category/${products.category.id}/${products.id}?color=${products.productColors[0]?.color?.name}`
        }    `}
        className="relative w-full h-[300px] xl:h-[400px] block"
      >
        {products?.discount !== 0 && (
          <div className="absolute left-0 top-0 z-10 w-[50px] h-[45px] ">
            <Image
              src="/tag-sale.jpg"
              alt="tag-sale"
              width={300}
              height={400}
              className="absolute z-0"
            />
            <p className="m-auto z-50 absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-white  text-[0.75rem]">
              {((products.discount / products.price) * 100).toFixed(0)}%
            </p>
          </div>
        )}
        <div className=" h-[100%]">
          <Image
            src={products?.productColors[currentColor]?.images[0]?.url}
            alt={products.productColors[currentColor].images[0].url}
            width={300}
            height={400}
            className="rounded-xl object-cover h-full"
          />
        </div>
      </Link>
      <div className="flex justify-start gap-x-2 my-4">
        {products?.productColors?.length > 0 &&
          products.productColors.map((item, index) => (
            <ColorCard
              key={item?.color?.id}
              colorValue={item?.color?.value}
              changeColor={() => handlechangeColor(index)}
              colorAcctive={currentColor === index ? true : false}
            />
          ))}
      </div>
      <div className="h-[100px] flex flex-col justify-between">
        <div className="text-base tracking-wider">{products?.name}</div>
        <div className="flex gap-x-4">
          <p className="font-bold text-base">
            {formatterVND.format(products?.price - products?.discount)}
          </p>
          {products?.discount !== 0 && (
            <del className="italic text-gray-500 text-sm">
              {formatterVND.format(products?.price)}
            </del>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
