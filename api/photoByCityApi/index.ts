import { IPhotoByCity } from "./photoByCity.type";

export const getPhoto = async (country: string) => {
  const url = `https://api.pexels.com/v1/search?query=${country}&per_page=1`;
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = (await JSON.parse(await response.text())) as IPhotoByCity;
    return result.photos[0].src.tiny;
  } catch (error) {
    console.error(error);
  }
};
