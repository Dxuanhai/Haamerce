import { Product } from "@/types";
import React from "react";
import ProductItem from "./items/productItem";
import { Ghost, ServerCrash } from "lucide-react";
interface Props {
  title?: string;
  products: Product[];
}

function ProductList({ products, title }: Props) {
  return (
    <>
      {products && products.length > 0 ? (
        <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col ">
            <h2 className="font-bold text-2xl xl:text-4xl mx-auto dark:text-[#c59f60]">
              {title}
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-x-4 gap-y-10 md:gap-6 mt-[60px] ">
              {products &&
                products.length > 0 &&
                products.map((item) => (
                  <ProductItem products={item} key={item.id} />
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="m-auto flex flex-col  justify-center items-center w-full">
          <Ghost className="h-32 w-20 dark:text-[#c59f60]" />
          <span className="text-xl">Oops, no result found :(</span>
        </div>
      )}
    </>
  );
}

export default ProductList;
