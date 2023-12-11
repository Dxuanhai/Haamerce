import { Product } from "@/types";
import React from "react";
import ProductItem from "./items/productItem";
import { ServerCrash } from "lucide-react";
interface Props {
  title?: string;
  products: Product[];
}

function ProductList({ products, title }: Props) {
  return (
    <>
      {products && products.length > 0 ? (
        <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col ">
            <h2 className="font-bold text-2xl xl:text-4xl mx-auto dark:text-white">
              {title}
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-x-4 gap-y-10 md:gap-10 mt-[60px] ">
              {products &&
                products.length > 0 &&
                products.map((item) => (
                  <ProductItem products={item} key={item.id} />
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="m-auto flex gap-x-2 items-center">
          <span>@Empty products</span>
          <ServerCrash />
        </div>
      )}
    </>
  );
}

export default ProductList;
