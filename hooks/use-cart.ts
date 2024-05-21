import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Order} from "@/types";

interface CartStore {
  items: Order[];

  addItem: (data: Order) => void;
  removeItem: (id: string, color: string, size: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, color: string, size: string) => void;
  decreaseQuantity: (id: string, color: string, size: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Order) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            item.color === data.color &&
            item.size === data.size
        );

        if (existingItem) {
          return toast.error("Sản phẩm đã được thêm vào.");
        }

        set({ items: [...get().items, data] });
        toast.success("Thêm sản phẩm thành công.");
      },
      removeItem: (id: string, color: string, size: string) => {
        set({
          // Filter out the item that matches all three criteria
          items: get().items.filter(
            (item) =>
              !(item.id === id && item.color === color && item.size === size)
          ),
        });

        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
      },

      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string, color: string, size: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.color === color && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (id: string, color: string, size: string) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id &&
              item.color === color &&
              item.size === size &&
              item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), // Remove items with quantity 0
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
