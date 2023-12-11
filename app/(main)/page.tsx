import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/productList";

import Billboard from "@/components/ui/billboard";

export const revalidate = 0;

const HomePage = async () => {
  const productsSellers = await getProducts({
    isFeatured: true,
  });
  const productsARRIVAL = await getProducts({});
  const billboard_green = await getBillboard(
    "9056f5fe-9120-4e7c-a0a5-61dcdd2a07c1"
  );
  const billboard2 = await getBillboard("6d23e6fe-b712-46da-afc3-667b941ea209");

  return (
    <div className="space-y-10 pb-10">
      <Billboard data={billboard2} />
      <ProductList products={productsSellers} title="BEST SELLERS" />
      <Billboard data={billboard_green} />
      <ProductList products={productsARRIVAL} title="NEW ARRIVAL" />
    </div>
  );
};

export default HomePage;
