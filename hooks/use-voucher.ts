import { create } from "zustand";
import { toast } from "react-hot-toast";

interface VoucherStore {
  voucher: {
    price: number;
    idGiftCode: string;
  };
  applyVoucher: (price: number, idGiftCode: string) => void;
  cancelVoucher: () => void;
}

const useVoucher = create<VoucherStore>((set) => ({
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
}));

export default useVoucher;
