import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Order } from "@/types";

interface CartStore {
  items: Order[];

  addItem: (data: Order) => void;
  removeItem: (id: string, size: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
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
          return toast.error("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string, size: string) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decreaseQuantity: (id: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
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
