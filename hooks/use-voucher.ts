import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
interface VoucherStore {
  voucher: {
    price: number;
    idGiftCode: string;
  };
  applyVoucher: (price: number, idGiftCode: string) => void;
  cancelVoucher: () => void;
}

const useVoucher = create(
  persist<VoucherStore>(
    (set) => ({
      voucher: {
        price: 0,
        idGiftCode: "",
      },
      applyVoucher: (price: number, idGiftCode: string) => {
        set({
          voucher: {
            price,
            idGiftCode,
          },
        });
      },
      cancelVoucher: () => {
        set({
          voucher: {
            price: 0,
            idGiftCode: "",
          },
        });
      },
    }),
    {
      name: "voucher-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useVoucher;
