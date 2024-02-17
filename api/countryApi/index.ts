export const getCountry = async (country: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${country}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6e2ec3cbfmsh5dadfbec371535bp1d9c7fjsn3a1b200a44da",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
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
