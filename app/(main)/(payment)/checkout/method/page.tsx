"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";

import Container from "@/components/ui/container";
import PaymentProducts from "@/components/paymentProducts";
import { Separator } from "@/components/ui/separator";

import PaymentMethod from "@/components/items/PaymentMethod";

const PaymentMethodPage = () => {
  const router = useRouter();

  const handleBackToCart = () => {
    router.push("/cart");
  };

  return (
    <Container>
      <div className="py-8 flex gap-x-4 items-center justify-center text-sm md:text-xl">
        <button
          onClick={handleBackToCart}
          className="inline-flex items-center gap-2"
        >
          <ShoppingBag className="h-6 w-6 dark:text-[#c59f60]" />
          <span>TRỞ VỀ GIỎ HÀNG</span>
        </button>
        <ChevronRight className="h-4 w-4" />
        <p className="cursor-pointer" onClick={() => router.push("/checkout")}>
          CHI TIẾT
        </p>
        <ChevronRight className="h-4 w-4" />
        <p className="font-bold">THANH TOÁN</p>
        <ChevronRight className="h-4 w-4" />
        <p className="">HOÀN THÀNH</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="order-2 md:order-1 md:col-span-7 border-r-2 border-slate-200 dark:border-zinc-600 p-8 md:p-12">
          <PaymentMethod />
        </div>
        <div className="order-1 md:order-2 md:col-span-5 p-8 md:p-12">
          <PaymentProducts />
        </div>
      </div>
    </Container>
  );
};

export default PaymentMethodPage;
