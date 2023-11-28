import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/productList";

import Billboard from "@/components/ui/billboard";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("8c59ae6e-d065-4811-b080-d4074ad9e4d8");

  return (
    <div className="space-y-10 pb-10">
      <Billboard data={billboard} />
      <ProductList products={products} title="Best Sellers" />
    </div>
  );
};

export default HomePage;
