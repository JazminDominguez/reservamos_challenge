export const getCities = async (search) => {
  console.log(search)
  const res = await fetch(
    `https://search.reservamos.mx/api/v2/places?q=${search}`
  );

  if (!res.ok) {
    return {
      success: false,
    };
  }

  const data = await res.json();
  return {
    success: true,
    data: data,
  };
};
