import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/productList";

import Billboard from "@/components/ui/billboard";
import { initialProfile } from "@/lib/initial-profile";

export const revalidate = 0;

const HomePage = async () => {
  const profile = await initialProfile();

  const productsSellers = await getProducts({
    isFeatured: true,
    take: ["8"],
  });
  const productsARRIVAL = await getProducts({
    take: ["4"],
  });
  const billboard_green = await getBillboard(
    "9056f5fe-9120-4e7c-a0a5-61dcdd2a07c1"
  );
  const billboard2 = await getBillboard("062dafd8-bff6-407f-a292-5cbd516d79c2");

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
