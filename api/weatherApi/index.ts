import { IWeather } from "./weatherApi.type";
export const getWeather = async (
  city: string,
  dateStart: string,
  dateEnd: string
) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dateStart}/${dateEnd}?unitGroup=metric&iconSet=icons1&include=days&key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&contentType=json`;

  try {
    const response = await fetch(url);
    const result = (await JSON.parse(await response.text())) as IWeather;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherToday = async (city: string) => {
  if (!city) {
    return undefined;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&iconSet=icons1&include=days&key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&contentType=json`;

  try {
    const response = await fetch(url);
    const result = (await JSON.parse(await response.text())) as IWeather;
    return result;
  } catch (error) {
    console.error(error);
  }
};
