import ListTrips from "@/components/ListTrips";
import CurrentWeather from "@/components/UI/CurrentWeather";
import TitlePage from "@/components/UI/TitlePage";
import s from "./style.module.scss";

export default function Main() {
  return (
    <main className={s.page}>
      <div className={s.mainPart}>
        <TitlePage />
        <ListTrips />
      </div>
      <div className={s.currentWeather}>
        <CurrentWeather />
      </div>
    </main>
  );
}
