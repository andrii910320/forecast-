import { getWeatherToday } from "@/api/weatherApi";
import { IDay, IWeather } from "@/api/weatherApi/weatherApi.type";
import { daysOfWeek } from "@/utils/constant";
import { ITripCard } from "@/utils/interface";
import cn from "classnames";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Timer from "../Timer";
import s from "./style.module.scss";

interface CurrentWeatherProps {
  trip: ITripCard;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ trip }) => {
  const { city, dayBegin } = trip ?? {};
  const [wetherToday, setWeatherToday] = useState<IDay>();
  useEffect(() => {
    const wetherToday = async () => {
      const res = await getWeatherToday(city);
      setWeatherToday(res?.days[0]);
    };
    wetherToday();
  }, [city]);
  const currentTime = new Date().getHours();
  console.log(currentTime);
  const evening = currentTime > 18 || currentTime < 7;

  return (
    <div className={cn(s.weather, { [s.evening]: evening })}>
      {wetherToday && (
        <div>
          <h3 className={s.dayOfWeek}>
            {daysOfWeek[new Date(wetherToday?.datetime).getDay()]}
          </h3>

          <div className={s.temperatureContainer}>
            <Image
              src={`/weather/${wetherToday?.icon}.png`}
              alt="icon"
              width={100}
              height={100}
            />
            <span className={s.temperature}>
              {Math.round(wetherToday.temp)}
              <span className={s.degree}>&#176;C</span>
            </span>
          </div>
          <h2 className={s.cityName}>{city}</h2>
        </div>
      )}
      {dayBegin && <Timer dayBegin={dayBegin} />}
    </div>
  );
};

export default CurrentWeather;
