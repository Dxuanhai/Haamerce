import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/productList";

import Billboard from "@/components/ui/billboard";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("653b09f2-6aa7-4f75-b282-393d2410b2bf");

  return (
    <div className="space-y-10 pb-10">
      <Billboard data={billboard} />
      <ProductList products={products} title="Best Sellers" />
    </div>
  );
};

export default HomePage;
