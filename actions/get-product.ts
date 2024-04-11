import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một giá trị mặc định hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getProduct;
