import { FC } from "react";
import s from "./style.module.scss";

interface TitlePageProps {}

const TitlePage: FC<TitlePageProps> = () => {
  return (
    <div className={s.title}>
      Weather <span className={s.forecast}>Forecast</span>
    </div>
  );
};

export default TitlePage;
