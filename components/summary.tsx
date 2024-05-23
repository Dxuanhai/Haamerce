"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Đã xảy ra lỗi.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number((item.price - item.discount) * item.quantity);
  }, 0);

  return (
    <div className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium ">Đơn hàng</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t dark:border-[#c59f60] pt-4">
          <div className="text-base font-medium ">Tổng</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={() => router.push("/checkout")}
        disabled={items.length === 0}
        className="w-full mt-6 dark:bg-[#db924b] dark:text-[#211308]"
      >
        THANH TOÁN
      </Button>
    </div>
  );
};

export default Summary;
