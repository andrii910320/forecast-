"use client";
import { firstTrip } from "@/utils/constant";
import { ITripCard } from "@/utils/interface";
import Image from "next/image";
import {
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import s from "./style.module.scss";
import plus from "@/assets/image/icon/plus/plus-symbol-button.png";
import cn from "classnames";

interface CardViewProps {
  arrTrips: ITripCard[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  activeTrip: number;
  setActiveTrip: Dispatch<SetStateAction<number>>;
}

const CardView: FC<CardViewProps> = ({
  arrTrips,
  setOpenModal,
  activeTrip,
  setActiveTrip,
}) => {
  const [startCord, setStartCord] = useState<number>(0);
  const setActiveCard = (id: number) => {
    setActiveTrip(id);
  };
  const scrollWhitMouse = (e: DragEvent<HTMLDivElement>) => {
    const scroll = document.getElementById("scroll");
    if (scroll) {
      scroll.scrollLeft = scroll?.scrollLeft + startCord - e.clientX;
    }
  };
  const scrollWhitButton = (shift: number) => {
    const scroll = document.getElementById("scroll");
    if (scroll) {
      scroll.scrollLeft = scroll?.scrollLeft - shift;
    }
  };
  const cards = arrTrips.map((card, index) => (
    <div
      draggable
      onDragStart={(e) => {
        setStartCord(e.clientX);
        const dragged = e.target as any;
        const image = new window.Image();
        e.dataTransfer.setDragImage(image, 11111110, 10);
      }}
      onDragOver={(e) => {
        scrollWhitMouse(e);
      }}
      key={index}
      className={cn(s.card, { [s.activeCard]: activeTrip === index })}
      onClick={() => setActiveCard(index)}
    >
      <div>
        {card.img && (
          <Image src={card.img} alt="Not found" width={180} height={180} />
        )}
      </div>
      <p className={s.nameCity}>{card.city}</p>
      <p className={s.period}>
        {card.dayBegin.replace(/-/g, ".")}-{card.dayFinish.replace(/-/g, ".")}
      </p>
    </div>
  ));

  const openModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className={s.cards} id="scroll">
        {cards}
        <div className={s.addNewTrip} onClick={openModal}>
          <Image src={plus} alt="+" width={20} height={20} />
          Add trip
        </div>
      </div>
      <div className={s.buttonContainer}>
        <button
          className={s.buttonControl}
          onClick={() => {
            scrollWhitButton(100);
          }}
        >
          {"<"}
        </button>
        <button
          className={s.buttonControl}
          onClick={() => {
            scrollWhitButton(-100);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CardView;
