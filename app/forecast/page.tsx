"use client";
import ListTrips from "@/components/ListTrips";
import CurrentWeather from "@/components/UI/CurrentWeather";
import TitlePage from "@/components/UI/TitlePage";
import { ITripCard } from "@/utils/interface";
import { useState } from "react";
import s from "./style.module.scss";

export default function Main() {
  const [filterArrTrips, setFilterArrTrips] = useState<ITripCard[]>([]);
  const [activeTrip, setActiveTrip] = useState(0);

  return (
    <main className={s.page}>
      <div className={s.mainPart}>
        <TitlePage />
        <ListTrips
          activeTrip={activeTrip}
          setActiveTrip={setActiveTrip}
          filterArrTrips={filterArrTrips}
          setFilterArrTrips={setFilterArrTrips}
        />
      </div>
      <div className={s.currentWeather}>
        <CurrentWeather trip={filterArrTrips[activeTrip]} />
      </div>
    </main>
  );
}
