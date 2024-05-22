import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một mảng rỗng hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch categories`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCategory = async (id: string): Promise<Category> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một mảng rỗng hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch categories`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
