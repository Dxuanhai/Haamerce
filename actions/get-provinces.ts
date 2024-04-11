const getProvinces = async () => {
  try {
    const res = await fetch("https://vapi.vnappmob.com/api/province");
    if (res.ok) {
      return res.json();
    } else {
      // Xử lý lỗi, ví dụ trả về một mảng rỗng hoặc ném ra một lỗi mới
      throw new Error(`Failed to fetch provinces`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getProvinces;
