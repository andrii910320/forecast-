import { IWeather } from "./weatherApi.type";
export const getWeather = async (
  city: string,
  dateStart: string,
  dateEnd: string
) => {
  // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateStart}/${dateEnd}?unitGroup=metric&amp;include=days&amp;key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&amp;contentType=json`;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateStart}/${dateEnd}?unitGroup=metric&iconSet=icons1&include=days&key=4KAZJNUS6VAA8BCWYB6Q7HHBT&contentType=json`;
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url);
    const result = (await JSON.parse(await response.text())) as IWeather;
    return result;
  } catch (error) {
    console.error(error);
  }
};
