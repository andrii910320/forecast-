export const getImageURL = (name: string) => {
  const path = `/assets/image/icon/weather/rain.png`;
  console.log(import.meta.url);
  const newURL = new URL("/assets/image/icon/weather/rain.png", import.meta.url)
    .href;
  console.log(newURL, name);
  return newURL;
};
