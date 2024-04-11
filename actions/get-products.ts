import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colors?: string[] | undefined;
  min?: string[];
  max?: string[];
  skip?: string[];
  take?: string[];
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        colors: query.colors,
        isFeatured: query.isFeatured,
        skip: query.skip,
        take: query.take,
        min: query.min,
        max: query.max,
      },
    });

    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một mảng rỗng hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch products`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getProducts;
