"use client";
import useCart from "@/hooks/use-cart";
import { formatterVND } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Circle } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function PaymentProducts() {
  const cart = useCart();

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number((item.price - item.discount) * item.quantity);
  }, 0);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        {cart.items.length > 0 &&
          cart.items.map((item) => (
            <div
              key={item.id}
              className="w-full  h-[100px] flex  items-center relative "
            >
              <div className="absolute -right-5 -top-5 h-8 w-8">
                <Circle className="h-full w-full absolute" />
                <span className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
                  {item?.quantity}
                </span>
              </div>
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="object-contain"
              />

              <div className="flex flex-col gap-y-2 px-4 ">
                <span>{item.name}</span>
                <div className="flex gap-x-2">
                  <span>{item.color}</span> /<span>{item.size}</span>
                </div>
              </div>
              <span className="ml-auto text-sm">
                {formatterVND?.format(
                  (item.price - item.discount) * item.quantity
                )}
              </span>
            </div>
          ))}
      </div>
      <Separator className="my-4" />
      <div className=" flex gap-x-2">
        <Input type="text" placeholder="Enter your voucher" />
        <Button>use</Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{formatterVND?.format(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <b>Shipping fee</b>
          <b>{formatterVND?.format(35000)}</b>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <span>Total</span>
          <span className="text-2xl font-bold">
            {formatterVND?.format(totalPrice + 35000)}
          </span>
        </div>
      </div>
    </>
  );
}

export default PaymentProducts;
