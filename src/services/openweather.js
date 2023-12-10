export const getForecast = async ( lat, lon ) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
  );

  if (!res.ok) {
    return {
      success: false,
    };
  }

  const data = await res.json();
  return {
    success: true,
    ...data,
  };
};
