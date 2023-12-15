"use client";
import useCart from "@/hooks/use-cart";
import { formatterVND } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Circle } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import useVoucher from "@/hooks/use-voucher";

function PaymentProducts() {
  const cart = useCart();
  const voucher = useVoucher();
  const [giftCode, setGiftCode] = useState("");
  const [dataVoucher, setDataVoucher] = useState(0);
  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number((item.price - item.discount) * item.quantity);
  }, 0);
  const handleCheckGiftCode = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vouchers/new?code=${giftCode}`
      );
      if (res.data.isActive === false) {
        toast.error("Gift code is used already");
        return;
      }
      setDataVoucher(res.data.discount);
      voucher.applyVoucher(res.data.discount, res.data.id);
    } catch (error) {
      setDataVoucher(0);
      voucher.cancelVoucher();
      toast.error("Gift code incorrect");
    }
  };
  const handleCancleGiftCode = () => {
    setDataVoucher(0);
    voucher.cancelVoucher();
  };
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
        <Input
          type="text"
          placeholder="Enter your voucher"
          onChange={(e: any) => setGiftCode(e.target.value)}
        />

        {dataVoucher !== 0 ? (
          <Button variant="destructive" onClick={() => handleCancleGiftCode()}>
            Cancel
          </Button>
        ) : (
          <Button onClick={() => handleCheckGiftCode()}>use</Button>
        )}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{formatterVND?.format(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm  text-red-600">
          <b>Shipping fee</b>
          <b>{formatterVND?.format(35000)}</b>
        </div>
        {dataVoucher !== 0 && (
          <div className="flex justify-between items-center text-sm text-green-600">
            <b>Voucher</b>
            <b>{formatterVND?.format(dataVoucher)}</b>
          </div>
        )}
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <span>Total</span>
          <span className="text-2xl font-bold">
            {formatterVND?.format(totalPrice + 35000 - dataVoucher)}
          </span>
        </div>
      </div>
    </>
  );
}

export default PaymentProducts;
