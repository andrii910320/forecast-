import { getWeather } from "@/api/weatherApi";
import { IDay } from "@/api/weatherApi/weatherApi.type";
import { daysOfWeek } from "@/utils/constant";
import Image from "next/image";
import { FC, useEffect } from "react";
import s from "./style.module.scss";

interface WeatherForecastProps {
  days: IDay[];
}

const WeatherForecast: FC<WeatherForecastProps> = ({ days }) => {
  const viewForecast = days.map((day) => {
    return (
      <div className={s.day}>
        {/* {console.log(day.icon)} */}
        <h6 className={s.nameDay}>
          {daysOfWeek[new Date(day.datetime).getDay()]}
        </h6>
        <div className={s.imageDay}>
          <img src={""} alt="Icon" width={50} height={50} />
        </div>
        <div className={s.temperatureContainer}>
          <p className={s.temperature}>
            {Math.round(day.feelslikemax)}
            <span>&#176;</span>
          </p>
          /
          <p className={s.temperature}>
            {Math.round(day.feelslikemin)}
            <span>&#176;</span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5 className={s.title}>Week</h5>
      <div className={s.containerForecast}>{viewForecast}</div>
    </div>
  );
};

export default WeatherForecast;
