import { Product } from "@/types";
import React from "react";
import ProductItem from "./productItem";

interface Props {
  title: string;
  products: Product[];
}

function Section({ products, title }: Props) {
  return (
    <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col ">
        <h2 className="font-bold text-6xl mx-auto">{title}</h2>
        <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <ProductItem products={item} key={item.id} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default Section;
