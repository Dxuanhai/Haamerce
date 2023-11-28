"use client";
import { formatterVND } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ColorCard from "./cards/colorCard";
import { Button } from "./ui/button";

interface Props {
  product: Product;
}

function ProductItems({ product }: Props) {
  const dataSizes = [
    {
      id: 1,
      value: "S",
    },
    {
      id: 2,
      value: "M",
    },
    {
      id: 3,
      value: "L",
    },
    {
      id: 4,
      value: "XL",
    },
  ];
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20  ">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-4 gap-x-6 ">
        <div className=" col-start-1 md:col-end-3 col-end-4   md:h-[450px] h-[550px]">
          <Image
            src={product.productColors[0]?.images[currentImage]?.url}
            alt="product"
            width={400}
            height={500}
            className="h-full w-full object-fill rounded-md"
          />
        </div>
        <div className="col-auto flex md:flex-col gap-4">
          {product &&
            product.productColors.length > 0 &&
            product.productColors.map((item, index) => (
              <div
                key={item.images[index].id}
                className="h-[250px] md:h-[200px] w-full "
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={product.productColors[0]?.images[index]?.url}
                  alt="product"
                  width={400}
                  height={500}
                  className={`object-cover rounded-md h-full w-full  cursor-pointer ${
                    currentImage === index
                      ? "shadow-md shadow-slate-700 dark:shadow-slate-300 "
                      : ""
                  } `}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="  ">
        <h3 className="font-bold text-3xl  uppercase mb-2 ">{product.name}</h3>
        <p className="uppercase">SKU: {product.id.substring(0, 6)}</p>
        <div className="flex gap-x-4  py-6 ">
          <p className="font-bold text-4xl">
            {formatterVND.format(product?.price - product?.discount)}
          </p>
          {product?.discount && (
            <del className="italic text-gray-500 text-2xl">
              {formatterVND.format(product?.price)}
            </del>
          )}
          {product.discount && (
            <span className="w-[60px] h-[20px] -translate-y-1/2 bg-orange-400 dark:bg-orange-700 flex justify-center items-center text-white">
              {((product.discount / product.price) * 100).toFixed(0)}%
            </span>
          )}
        </div>

        <div className="flex gap-x-2">
          <b>Color: </b>
          <span>{product.productColors[0]?.color?.name}</span>
        </div>

        <div className="flex justify-start gap-x-2 my-4">
          {product?.productColors?.length > 0 &&
            product.productColors.map((item, index) => (
              <ColorCard
                key={item?.color?.id}
                color={item?.color?.value}
                changeColor={() => alert()}
                colorAcctive={true}
              />
            ))}
        </div>

        <div className="flex gap-x-4">
          {dataSizes.map((data) => {
            const isColorMatch =
              product.productColors.length > 0 &&
              product.productColors[0].sizes.some(
                (item) => item.value === data.value
              );
            return (
              <div
                key={data.id}
                className={`py-2 px-6 border-2 dark:border-zinc-500  border-zinc-200  rounded-lg cursor-pointer`}
              >
                <button className="text-base font-bold relative">
                  {data.value}
                  {!isColorMatch && (
                    <span className="h-[50px] w-[2px] bg-slate-600 left-1 -top-3 rotate-45 absolute z-10"></span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-x-4 items-center justify-start">
          <b>Quantity: </b>
          <div className="flex h-[30px]   items-center justify-start">
            <Button className="text-2xl">-</Button>
            <div className="h-full w-[80px] flex justify-center items-center text-lg">
              1
            </div>
            <Button className="text-2xl">+</Button>
          </div>
        </div>

        <div className="flex gap-x-10 h-[60px] mt-10 md:mt-20 w-full">
          <Button className="h-full px-10 text-base rounded-tl-2xl rounded-br-2xl">
            Add to card
          </Button>
          <Button
            variant="destructive"
            className="text-base h-full rounded-tl-2xl rounded-br-2xl "
          >
            Buy now!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
