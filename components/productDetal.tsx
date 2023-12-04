"use client";
import { formatterVND } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ColorCard from "./items/colorCard";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

function ProductDetail({ product }: Props) {
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

  const cart = useCart();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");

  let indexColor = 0;
  product.productColors?.map((item, index) => {
    if (selectedColor === item.color.name) return (indexColor = index);
  });

  const [currentColor, setCurrentColor] = useState(indexColor);
  const [currentImage, setCurrentImage] = useState(0);

  const [dataProduct, setDataProduct] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    color: selectedColor || "",
    size: selectedSize || "",
    image: product.productColors[indexColor].images[0].url,
    quantity: 1,
  });

  const handleChangeColor = (index: number) => {
    setCurrentColor(index);
    setDataProduct({
      ...dataProduct,
      color: product.productColors[index].color.name,
      image: product.productColors[index].images[0].url,
    });
  };
  const onAddToCart = () => {
    if (!dataProduct.color || !dataProduct.size)
      toast.error("Please choose a color and size");
    else cart.addItem(dataProduct);
  };

  const Increase = () => {
    setDataProduct({ ...dataProduct, quantity: dataProduct.quantity + 1 });
  };
  const Decrease = () => {
    if (dataProduct.quantity > 1) {
      setDataProduct({ ...dataProduct, quantity: dataProduct.quantity - 1 });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20  ">
      <div className="grid grid-cols-12  gap-4  ">
        <div className=" col-start-1 col-span-12 md:col-end-10   h-[450px] xl:h-[550px]">
          <Image
            src={
              product?.productColors[currentColor]?.images[currentImage]?.url
            }
            alt="product"
            width={400}
            height={500}
            className="h-full w-full object-fill rounded-md"
          />
        </div>
        <ScrollArea className="col-start-1 md:col-start-10 col-end-13">
          <div className="flex md:flex-col h-[250px] md:h-[550px]">
            {product &&
              product.productColors.length > 0 &&
              product.productColors[currentColor]?.images.map((item, index) => (
                <div
                  key={index}
                  className=" h-[250px] md:h-[160px] xl:[200px] mr-[20px] md:mb-[20px] w-[35vw] md:w-full"
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={item.url}
                    alt="product"
                    width={500}
                    height={700}
                    className={`object-cover rounded-md h-full w-full cursor-pointer ${
                      currentImage === index
                        ? "shadow-md shadow-slate-700 dark:shadow-slate-300"
                        : ""
                    }`}
                  />
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
          <span>{product.productColors[currentColor]?.color?.name}</span>
        </div>

        <div className="flex justify-start gap-x-2 my-4">
          {product?.productColors?.length > 0 &&
            product.productColors.map((item, index) => (
              <Link
                key={item?.color?.id}
                href={`?color=${item.color.name}${
                  selectedSize ? `&size=${selectedSize}` : ""
                }`}
                onClick={() => handleChangeColor(index)}
              >
                <ColorCard
                  colorValue={item?.color?.value}
                  colorAcctive={
                    item.color?.name === selectedColor ? true : false
                  }
                />
              </Link>
            ))}
        </div>

        <div className="flex gap-x-4">
          {dataSizes.map((data) => {
            const isColorMatch =
              product.productColors.length > 0 &&
              product.productColors[currentColor].sizes.some(
                (item) => item.value === data.value
              );
            return (
              <Link
                href={`?color=${selectedColor}&size=${data.value}`}
                key={data.id}
                onClick={() =>
                  setDataProduct({ ...dataProduct, size: data.value })
                }
                className={` ${
                  !isColorMatch && "pointer-events-none"
                }  py-2 px-6 border-2   rounded-lg cursor-pointer
                ${
                  data.value === selectedSize
                    ? " border-2 border-zinc-900 dark:border-zinc-100 "
                    : "dark:border-zinc-500  border-zinc-200"
                }`}
              >
                <button className={`  text-base font-bold relative`}>
                  {data.value}
                  {!isColorMatch && (
                    <span className="h-[50px] w-[2px] bg-slate-600 left-1 -top-3 rotate-45 absolute z-10"></span>
                  )}
                </button>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex gap-x-4 items-center justify-start">
          <b>Quantity: </b>
          <div className="flex h-[30px]   items-center justify-start">
            <Button
              className="text-2xl dark:bg-slate-300 dark:hover:opacity-70"
              onClick={() => Decrease()}
            >
              -
            </Button>
            <div className="h-full w-[80px] flex justify-center items-center text-lg">
              {dataProduct.quantity}
            </div>
            <Button
              className="text-2xl dark:bg-slate-300 dark:hover:opacity-70"
              onClick={() => Increase()}
            >
              +
            </Button>
          </div>
        </div>

        <div
          className="flex gap-x-10 h-[60px] mt-10 md:mt-20 w-full"
          onClick={onAddToCart}
        >
          <Button className="h-full px-10 text-base rounded-tl-2xl rounded-br-2xl dark:bg-slate-300 dark:hover:opacity-70">
            Add to card
          </Button>
          <Button
            variant="destructive"
            className="text-base h-full rounded-tl-2xl rounded-br-2xl dark:bg-[#EF4444] dark:hover:opacity-70"
          >
            Buy now!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
