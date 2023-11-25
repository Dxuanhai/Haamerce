"use client";

import { Product } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ColorCard from "./cards/colorCard";
interface Props {
  products: Product;
}

function ProductItem({ products }: Props) {
  const [currentColor, setCurrentColor] = useState(0);
  const handlechangeColor = (index: number) => {
    setCurrentColor(index);
  };
  return (
    <div className="w-full">
      <Image
        src={products?.productColors[currentColor]?.images[0]?.url}
        alt={products.productColors[currentColor].images[0].url}
        height={600}
        width={400}

        //className="w-auto"
      />
      <div className="flex justify-start gap-x-2">
        {products?.productColors?.length > 0 &&
          products.productColors.map((item, index) => (
            <ColorCard
              key={item?.color?.id}
              color={item?.color?.value}
              changeColor={() => handlechangeColor(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductItem;
