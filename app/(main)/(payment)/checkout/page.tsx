"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Container from "@/components/ui/container";
import ShipmentDetails from "@/components/form/shipmentDetails";
import PaymentProducts from "@/components/paymentProducts";
import { Separator } from "@/components/ui/separator";
import getProvinces from "@/actions/get-provinces";
import { initialProfile } from "@/lib/initial-profile";

const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();

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
  if (!isSignedIn) {
    return router.push("/sign-in");
  }
  const handleBackToCart = () => {
    router.push("/cart");
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-8 flex gap-x-4 items-center justify-center text-sm md:text-xl px-8 md:px-0">
        <button
          onClick={handleBackToCart}
          className="inline-flex items-center gap-2"
        >
          <ShoppingBag className="h-6 w-6 dark:text-[#c59f60]" />
          <span>TRỞ VỀ GIỎ HÀNG</span>
        </button>
        <ChevronRight className="h-4 w-4" />
        <p
          className="cursor-pointer font-bold"
          onClick={() => router.push("/checkout")}
        >
          CHI TIẾT
        </p>
        <ChevronRight className="h-4 w-4" />
        <p className="">THANH TOÁN</p>
        <ChevronRight className="h-4 w-4" />
        <p className="">HOÀN THÀNH</p>
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
