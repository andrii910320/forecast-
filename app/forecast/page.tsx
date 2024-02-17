"use client";
import ListTrips from "@/components/ListTrips";
import CurrentWeather from "@/components/UI/CurrentWeather";
import TitlePage from "@/components/UI/TitlePage";
import { useState } from "react";
import s from "./style.module.scss";

export default function Main() {
  const [activeTrip, setActiveTrip] = useState(0);
  return (
    <main className={s.page}>
      <div className={s.mainPart}>
        <TitlePage />
        <ListTrips activeTrip={activeTrip} setActiveTrip={setActiveTrip} />
      </div>
      <div className={s.currentWeather}>
        <CurrentWeather />
      </div>
    </main>
  );
}
