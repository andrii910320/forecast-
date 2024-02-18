"use client";
import { getWeather } from "@/api/weatherApi";
import { IDay } from "@/api/weatherApi/weatherApi.type";
import { firstTrip } from "@/utils/constant";
import { ITripCard } from "@/utils/interface";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ModalAddNewTrip from "../UI/ModalAddNewTrip";
import CardView from "../UI/ViewCard";
import WeatherForecast from "../WeatherForecast";
import searchIcon from "@/assets/image/icon/search/search.png";
import s from "./style.module.scss";

interface ListTripsProps {
  activeTrip: number;
  setActiveTrip: Dispatch<SetStateAction<number>>;
  filterArrTrips: ITripCard[];
  setFilterArrTrips: Dispatch<SetStateAction<ITripCard[]>>;
}

const ListTrips: FC<ListTripsProps> = ({
  activeTrip,
  setActiveTrip,
  filterArrTrips,
  setFilterArrTrips,
}) => {
  const [arrTrips, setArrTrips] = useState<ITripCard[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [forecast, setForecast] = useState<IDay[]>([]);
  console.log(arrTrips, "asd");

  const getWeatherByCity = async () => {
    const { city, dayBegin, dayFinish } = filterArrTrips[activeTrip];
    const forecast = await getWeather(city, dayBegin, dayFinish);
    forecast?.days && setForecast(forecast?.days);
  };

  useEffect(() => {
    if (arrTrips.length != 0) {
      getWeatherByCity();
    }
  }, [activeTrip, arrTrips]);

  useEffect(() => {
    const list = localStorage.getItem("TripList");
    if (!list) {
      localStorage.setItem("TripList", JSON.stringify([firstTrip]));
    } else {
      const arrTripsLocalStore = JSON.parse(list) as ITripCard[];
      setArrTrips(arrTripsLocalStore);
    }
  }, []);

  useEffect(() => {
    const list = localStorage.getItem("TripList");
    if (!list) {
      localStorage.setItem("TripList", JSON.stringify([firstTrip]));
    } else {
      const arrTripsLocalStore = JSON.parse(list) as ITripCard[];
      const arr = arrTrips.filter((trip) => trip.city.startsWith(search));
      if (arr.length === 0 && !search) {
        setFilterArrTrips(arrTripsLocalStore);
      } else {
        setFilterArrTrips(arr);
      }
      setArrTrips(arrTripsLocalStore);
    }
  }, [search]);

  return (
    <div className={s.containerForTrips}>
      <div className={s.searchField}>
        <input
          type="text"
          className={s.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image
          className={s.iconSearch}
          src={searchIcon}
          alt=""
          width={20}
          height={20}
        />
      </div>
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
          setFilterArrTrips={setFilterArrTrips}
        />
      )}
      {forecast ? <WeatherForecast days={forecast} /> : ""}
    </div>
  );
};

export default ListTrips;
