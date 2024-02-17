"use client";
import { getWeather } from "@/api/weatherApi";
import { IDay } from "@/api/weatherApi/weatherApi.type";
import { firstTrip } from "@/utils/constant";
import { ITripCard } from "@/utils/interface";
import { FC, useEffect, useState } from "react";
import ModalAddNewTrip from "../UI/ModalAddNewTrip";
import CardView from "../UI/ViewCard";
import WeatherForecast from "../WeatherForecast";
import s from "./style.module.scss";

interface ListTripsProps {}

const ListTrips: FC<ListTripsProps> = () => {
  const [arrTrips, setArrTrips] = useState<ITripCard[]>([]);
  const [filterArrTrips, setFilterArrTrips] = useState<ITripCard[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTrip, setActiveTrip] = useState(0);
  const [search, setSearch] = useState("");
  const [forecast, setForecast] = useState<IDay[]>([]);

  useEffect(() => {
    const getWeatherByCity = async () => {
      const { city, dayBegin, dayFinish } = arrTrips[activeTrip];
      const forecast = await getWeather(city, dayBegin, dayFinish);
      forecast?.days && setForecast(forecast?.days);
    };
    if (arrTrips.length != 0) {
      getWeatherByCity();
    }
  }, [activeTrip]);

  useEffect(() => {
    const list = localStorage.getItem("TripList");
    if (!list) {
      localStorage.setItem("TripList", JSON.stringify([firstTrip]));
    } else {
      const arrTripsLocalStore = JSON.parse(list) as ITripCard[];
      const arr = arrTripsLocalStore.filter((trip) =>
        trip.city.startsWith(search)
      );
      if (arr.length === 0 && !search) {
        console.log(arrTripsLocalStore, "arr");
        setFilterArrTrips(arrTripsLocalStore);
      } else {
        setFilterArrTrips(arr);
      }
      setArrTrips(arrTripsLocalStore);
    }
  }, [search]);

  return (
    <div className={s.containerForTrips}>
      <input
        type="text"
        className={s.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CardView
        arrTrips={filterArrTrips}
        setOpenModal={setOpenModal}
        activeTrip={activeTrip}
        setActiveTrip={setActiveTrip}
      />
      {openModal && (
        <ModalAddNewTrip
          setOpenModal={setOpenModal}
          setArrTrips={setArrTrips}
        />
      )}
      {arrTrips && activeTrip ? <WeatherForecast days={forecast} /> : " "}
    </div>
  );
};

export default ListTrips;
