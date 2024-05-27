import { getBillboards } from "@/actions/billboards";
import getProducts from "@/actions/get-products";
import ReviewsUser from "@/components/ReviewsUser";
import ProductList from "@/components/productList";
import Billboard from "@/components/ui/billboard";
import { initialProfile } from "@/lib/initial-profile";

export const revalidate = 0;

const HomePage = async () => {
  await initialProfile();
  const productsSellers = await getProducts({
    isFeatured: true,
    take: ["8"],
  });
  const productsARRIVAL = await getProducts({
    take: ["4"],
  });
  const dataBillboards = await getBillboards();

  return (
    <div className="space-y-10 pb-10">
      <Billboard data={dataBillboards} />
      <ProductList products={productsSellers} title="BÁN CHẠY NHẤT" />
      <div className="my-12 hidden md:block">
        <ReviewsUser />
      </div>
      <ProductList products={productsARRIVAL} title="HÀNG MỚI VỀ" />
    </div>
  );
};

export default HomePage;
