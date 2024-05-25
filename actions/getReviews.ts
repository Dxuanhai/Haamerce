import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

const getReviews = async (id: string): Promise<Review[]> => {
  try {
    const res = await fetch(`${URL}/?productId=${id}`);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một giá trị mặc định hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch Review with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getReviews;
