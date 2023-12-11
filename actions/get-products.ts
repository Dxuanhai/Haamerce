import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colors?: string[] | undefined;
  min?: string;
  max?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colors: query.colors,
      isFeatured: query.isFeatured,
      min: query.min || undefined,
      max: query.max || undefined,
    },
  });

  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    throw error;
  }
};

export default getProducts;
