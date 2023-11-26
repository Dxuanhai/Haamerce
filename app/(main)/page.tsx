import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Section from "@/components/section";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("8c59ae6e-d065-4811-b080-d4074ad9e4d8");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <Section products={products} title="Best Sellers" />
      </div>
    </Container>
  );
};

export default HomePage;
