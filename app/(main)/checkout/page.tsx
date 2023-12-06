import getProvinces from "@/actions/get-provinces";
import ShipmentDetails from "@/components/form/shipmentDetails";
import PaymentProducts from "@/components/paymentProducts";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

async function CheckoutPage() {
  const provinces = await getProvinces();

  return (
    <section className="pb-[40px]">
      <div className="p-4 flex gap-x-2 items-center justify-start  text-[10px] md:text-base">
        <Link href="/cart">
          <ShoppingCart className="h-6 w-6" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <p className="font-bold">Shipment details</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="order-2 md:order-1  col-start-1 md:col-end-8 p-[60px]  border-r-2  border-slate-200 dark:border-zinc-600">
          <ShipmentDetails provinces={provinces.results} />
        </div>
        <div className="order-1 md:order-2  col-start-1  md:col-start-8 md:col-end-13  p-[40px]">
          <PaymentProducts />
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
