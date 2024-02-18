import { FC, useEffect, useState } from "react";
import s from "./style.module.scss";

interface TimerProps {
  dayBegin: string;
}

const Timer: FC<TimerProps> = ({ dayBegin }) => {
  const daysLast = Math.abs(
    new Date().getDate() - new Date(dayBegin).getDate()
  );
  const hoursLast = Math.abs(
    25 - new Date(dayBegin).getHours() - new Date().getHours()
  );
  const minutesLast = Math.abs(
    60 - new Date(dayBegin).getMinutes() - new Date().getMinutes()
  );

  const [secondsLast, setSeconds] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(
        60 - new Date(dayBegin).getSeconds() - new Date().getSeconds()
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={s.timer}>
      <ul className={s.list}>
        <li className={s.item}>
          <div className={s.numbers}>{daysLast}</div>
          <div>DAY{daysLast > 1 ? "S" : ""}</div>
        </li>
        <li className={s.item}>
          <div className={s.numbers}>{hoursLast}</div>
          <div>HOUR{hoursLast > 1 ? "S" : ""}</div>
        </li>
        <li className={s.item}>
          <div className={s.numbers}>{minutesLast}</div>
          <div>MINUTE{minutesLast > 1 ? "S" : ""}</div>
        </li>
        <li className={s.item}>
          <div className={s.numbers}>{secondsLast}</div>
          <div>SECOND{secondsLast > 1 ? "S" : ""}</div>
        </li>
      </ul>
    </div>
  );
};

export default Timer;
