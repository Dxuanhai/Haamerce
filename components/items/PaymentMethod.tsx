"use client";
import { useForm, Controller } from "react-hook-form";
import useCart from "@/hooks/use-cart";
import useVoucher from "@/hooks/use-voucher";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useUserInfo from "@/hooks/use-userInfo";

const PaymentMethod = () => {
  const cart = useCart();
  const voucher = useVoucher();
  const userInfo = useUserInfo();
  const router = useRouter();
  const { control, watch } = useForm();
  const selectedMethod = watch("paymentMethod");
  const [showButton, setShowButton] = useState(false);
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/payment-momo`;

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number((item.price - item.discount) * item.quantity);
  }, 0);
  const amount = totalPrice + 35000 - voucher.voucher.price;

  useEffect(() => {
    if (selectedMethod) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [selectedMethod]);

  const handleMOMO = async () => {
    try {
      const response = await axios.post(URL, {
        amount,
      });

      if (response.status === 200) {
        userInfo.add({
          ...userInfo.userInfo,
          paymentMethod: "MOMO",
        });
        router.push(response.data.payUrl);
      } else {
        console.error("Payment failed:", response.data);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-20">
      <h2 className="font-bold text-3xl">PHƯƠNG THỨC THANH TOÁN</h2>
      <div className="flex flex-col gap-y-8">
        <div className="flex gap-x-4 justify-start items-center">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === "THANH TOÁN ONLINE VÍ MOMO"}
                onCheckedChange={() =>
                  field.onChange("THANH TOÁN ONLINE VÍ MOMO")
                }
              />
            )}
          />
          <Image
            src="/momo_icon_square_pinkbg@3x.png"
            alt="momo_icon_square_pinkbg@3x"
            width={60}
            height={40}
          />
          <span className="font-bold">THANH TOÁN ONLINE VÍ MOMO</span>
        </div>
        {selectedMethod === "THANH TOÁN ONLINE VÍ MOMO" && (
          <div
            onClick={() => handleMOMO()}
            className="transition-opacity duration-500 ease-in-out"
            style={{ opacity: showButton ? 1 : 0 }}
          >
            <Button className="font-bold px-8 ml-8">TIẾP TỤC</Button>
          </div>
        )}

        <div className="flex gap-x-4 justify-start items-center">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === "CỔNG THANH TOÁN VNPAY"}
                onCheckedChange={() => field.onChange("CỔNG THANH TOÁN VNPAY")}
              />
            )}
          />
          <Image src="/VNPAY-QR.png" alt="ttgiaohang" width={60} height={40} />
          <span className="font-bold">CỔNG THANH TOÁN VNPAY</span>
        </div>
        {selectedMethod === "CỔNG THANH TOÁN VNPAY" && (
          <div
            className="transition-opacity duration-500 ease-in-out"
            style={{ opacity: showButton ? 1 : 0 }}
          >
            <Button className="font-bold px-8 ml-8">TIẾP TỤC</Button>
          </div>
        )}

        <div className="flex gap-x-4 justify-start items-center">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === "THANH TOÁN KHI NHẬN HÀNG (COD)"}
                onCheckedChange={() =>
                  field.onChange("THANH TOÁN KHI NHẬN HÀNG (COD)")
                }
              />
            )}
          />
          <Image src="/cod.png" alt="ttgiaohang" width={60} height={40} />
          <span className="font-bold">THANH TOÁN KHI NHẬN HÀNG (COD)</span>
        </div>
        {selectedMethod === "THANH TOÁN KHI NHẬN HÀNG (COD)" && (
          <div
            className="transition-opacity duration-500 ease-in-out"
            style={{ opacity: showButton ? 1 : 0 }}
          >
            <Button className="font-bold px-8 ml-8">TIẾP TỤC</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
