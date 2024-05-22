"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";

import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import useVoucher from "@/hooks/use-voucher";
import useCart from "@/hooks/use-cart";
import useUserInfo from "@/hooks/use-userInfo";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const router = useRouter();
  const userInfo = useUserInfo(); // Get the store, not just the data
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCart();
  const voucher = useVoucher();
  const newItems = cart.items.map((item) => ({
    ...item,
    price: item.price - item.discount,
    discount: undefined,
  }));
  useEffect(() => {
    const addOrder = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
        const res = await axios.post(url, {
          paymentMethod: userInfo.userInfo.paymentMethod, // Access data from store
          phoneNumber: userInfo.userInfo.phoneNumber,
          address: userInfo.userInfo.address,
          email: userInfo.userInfo.email,
          fullName: userInfo.userInfo.fullName,
          province: userInfo.userInfo.province,
          district: userInfo.userInfo.district,
          ward: userInfo.userInfo.ward,
          products: newItems,
          voucher: voucher.voucher.price ? voucher.voucher.price : null,
          idGiftCode: voucher.voucher.idGiftCode
            ? voucher.voucher.idGiftCode
            : null,
        });

        if (res.data) {
          toast.success("Order was successfully");
          console.log("🚀  / checkPayment  / res.data:", res.data);
          cart.removeAll();
          voucher.cancelVoucher();
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Use an effect to wait for userInfo to be available
    if (userInfo.userInfo.fullName !== "") {
      addOrder();
    }
  }, [userInfo.userInfo]); // Depend on userInfo.userInfo

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
      <div className="py-8 flex gap-x-4 items-center justify-center text-sm md:text-xl px-8 md:px-0">
        <button
          onClick={handleBackToCart}
          className="inline-flex items-center gap-2"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>TRỞ VỀ GIỎ HÀNG</span>
        </button>
        <ChevronRight className="h-4 w-4" />
        <p className="cursor-pointer " onClick={() => router.push("/checkout")}>
          CHI TIẾT
        </p>
        <ChevronRight className="h-4 w-4" />
        <p className="">THANH TOÁN</p>
        <ChevronRight className="h-4 w-4" />
        <p className="font-bold">HOÀN THÀNH</p>
      </div>
      <Separator />
      <div className="">{JSON.stringify(userInfo.userInfo)}</div>
    </Container>
  );
};

export default CheckoutPage;
