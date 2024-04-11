"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

import Container from "@/components/ui/container";
import ShipmentDetails from "@/components/form/shipmentDetails";
import PaymentProducts from "@/components/paymentProducts";
import { Separator } from "@/components/ui/separator";
import getProvinces from "@/actions/get-provinces";

const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data.results);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  const handleBackToCart = () => {
    router.push("/cart");
  };

  if (isLoading) {
    return (
      <Container>
        <div className="py-8 flex justify-center">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8 flex gap-x-2 items-center justify-start text-sm md:text-base">
        <button
          onClick={handleBackToCart}
          className="inline-flex items-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Back to Cart</span>
        </button>
        <ChevronRight className="h-4 w-4" />
        <p className="font-bold">Shipment details</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="order-2 md:order-1 md:col-span-7 border-r-2 border-slate-200 dark:border-zinc-600 p-8 md:p-12">
          <ShipmentDetails provinces={provinces} />
        </div>
        <div className="order-1 md:order-2 md:col-span-5 p-8 md:p-12">
          <PaymentProducts />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
