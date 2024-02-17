export const getCountry = async (country: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${country}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RapidAPI_Host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await JSON.parse(await response.text());
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
