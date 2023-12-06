const getProvinces = async () => {
  const res = await fetch("https://vapi.vnappmob.com/api/province");

  return res.json();
};

export default getProvinces;
