import axios from "axios";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/profiles`;

export const getProfile = async (id: string) => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một giá trị mặc định hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch Profile with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProfiles = async () => {
  try {
    const res = await fetch(`${URL}`);

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProfile = async (
  firstName: string | null,
  lastName: string | null,
  userId: string,
  imageUrl: string | null
) => {
  try {
    const res = await axios.post(`${URL}`, {
      userId: userId,
      name: `${firstName} ${lastName}`,
      imageUrl: imageUrl,
      storeId: `${process.env.ID_STORE}`,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
