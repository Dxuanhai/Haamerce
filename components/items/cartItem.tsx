import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Order } from "@/types";
import { Button } from "../ui/button";

interface CartItemProps {
  data: Order;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data?.id, data?.size);
  };

  const Increase = () => {
    cart.increaseQuantity(data.id);
  };

  const Decrease = () => {
    cart.decreaseQuantity(data.id);
  };
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-36 w-24 rounded-md overflow-hidden md:h-64 md:w-48">
        <Image
          fill
          src={data.image}
          alt=""
          className="object-cover object-center "
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            onClick={onRemove}
            icon={<X size={15} className="text-black" />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="">{data.color}</p>
            <p className="ml-4 border-l border-gray-200 pl-4">{data.size}</p>
          </div>
          <div className="my-4 md:my-8 flex gap-x-4 items-center justify-start">
            <div className="flex h-[30px]   items-center justify-start">
              <Button
                className="text-2xl dark:bg-slate-300 dark:hover:opacity-70"
                onClick={() => Decrease()}
              >
                -
              </Button>
              <div className="h-full w-[74px] flex justify-center items-center text-base md:text-lg">
                {data.quantity}
              </div>
              <Button
                className="text-2xl dark:bg-slate-300 dark:hover:opacity-70"
                onClick={() => Increase()}
              >
                +
              </Button>
            </div>
          </div>
          <Currency value={data.price - data.discount} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
