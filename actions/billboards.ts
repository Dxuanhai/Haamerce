

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboard = async (id: string) => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một giá trị mặc định hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch billboard with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getBillboards = async () => {
  try {
    const res = await fetch(`${URL}`);

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
