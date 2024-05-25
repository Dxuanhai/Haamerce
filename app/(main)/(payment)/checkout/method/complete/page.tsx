"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";

import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import useVoucher from "@/hooks/use-voucher";
import useCart from "@/hooks/use-cart";
import { BsBagCheckFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import useUserInfo from "@/hooks/use-userInfo";
import { useUser } from "@clerk/nextjs";
import { UserInfo } from "@/types";

// Utility function to check if all required fields are present
const isUserInfoComplete = (userInfo: UserInfo) => {
  return (
    userInfo.paymentMethod &&
    userInfo.phoneNumber &&
    userInfo.address &&
    userInfo.email &&
    userInfo.fullName &&
    userInfo.province &&
    userInfo.district &&
    userInfo.ward
  );
};

const CheckoutPage = () => {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { user } = useUser(); // Access user from the Zustand store
  console.log("🚀  / CheckoutPage  / user:", userInfo);
  console.log("🚀  / CheckoutPage  / userInfo:", user?.id);
  const cart = useCart();
  const voucher = useVoucher();

  const [isLoading, setIsLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const orderSubmittedRef = useRef(false); // New ref to track order submission

  const newItems = cart.items.map((item) => ({
    ...item,
    price: item.price - item.discount,
    discount: undefined,
  }));

  const addOrder = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
      const res = await axios.post(url, {
        paymentMethod: userInfo.paymentMethod,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        email: userInfo.email,
        fullName: userInfo.fullName,
        province: userInfo.province,
        district: userInfo.district,
        ward: userInfo.ward,
        products: newItems,
        userId: user?.id,
        voucher: voucher.voucher.price ? voucher.voucher.price : null,
        idGiftCode: voucher.voucher.idGiftCode
          ? voucher.voucher.idGiftCode
          : null,
      });

      if (res.data) {
        console.log("🚀  / checkPayment  / res.data:", res.data);
        cart.removeAll();
        voucher.cancelVoucher();
        setOrderPlaced(true); // Set orderPlaced to true after successful order
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      isUserInfoComplete(userInfo) &&
      user?.id &&
      !orderSubmittedRef.current
    ) {
      orderSubmittedRef.current = true; // Mark as submitted
      addOrder();
    }
  }, [userInfo, user?.id]); // Only run when userInfo or user.id changes

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

  // Render different content based on orderPlaced
  if (orderPlaced) {
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
          <p
            className="cursor-pointer"
            onClick={() => router.push("/checkout")}
          >
            CHI TIẾT
          </p>
          <ChevronRight className="h-4 w-4" />
          <p className="">THANH TOÁN</p>
          <ChevronRight className="h-4 w-4" />
          <p className="font-bold">HOÀN THÀNH</p>
        </div>
        <Separator />
        <div className="w-full flex flex-col justify-center md:justify-start items-center gap-6 py-[10%]">
          <BsBagCheckFill size={128} className="dark:text-[#db924b] mb-10" />
          <span className="font-bold">ĐẶT HÀNG THÀNH CÔNG!</span>
          <span className="text-center">
            Chúng tôi sẽ liên hệ quý khách để xác nhận đơn hàng trong thời gian
            sớm nhất
          </span>
          <Button
            className="dark:bg-[#db924b] dark:text-[#211308] mt-8 px-10 py-6 font-bold hover:opacity-70"
            onClick={() => router.push("/")}
          >
            TIẾP TỤC MUA SẮM
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
};

export default CheckoutPage;
