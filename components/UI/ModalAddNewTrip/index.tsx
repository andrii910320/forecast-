"use client";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import s from "./style.module.scss";
import close from "@/assets/image/icon/close/close.png";
import calendar from "@/assets/image/icon/date/calendar.png";
import Image from "next/image";
import cn from "classnames";
import { ITripCard } from "@/utils/interface";
import { formatDate } from "@/helpers/formatDate";
import { getCountry } from "@/api/countryApi";
import ListResultCountrySearch from "../ListResultCountrySearch";
import { ICountry } from "@/api/countryApi/county.type";
import { validateFieldForm } from "@/validators/addNewTrip";
import { getPhoto } from "@/api/photoByCityApi";

interface ModalAddNewTripProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setArrTrips: Dispatch<SetStateAction<ITripCard[]>>;
}

const ModalAddNewTrip: FC<ModalAddNewTripProps> = ({
  setOpenModal,
  setArrTrips,
}) => {
  const [country, setCountry] = useState("");
  const [needRerender, setNeedRerender] = useState(true);
  const [dataStart, setDataStart] = useState("");
  const [dataEnd, setDataEnd] = useState("");
  const [arrCountry, setArrCountry] = useState<ICountry[]>([]);

  const [errorCity, setErrorCity] = useState("");
  const [errorStartDate, setErrorStartDate] = useState("");
  const [errorEndDate, setEndDate] = useState("");

  useEffect(() => {
    if (country && needRerender) {
      const timeOutId = setTimeout(async () => {
        const arr = await getCountry(country);
        setArrCountry(arr);
      }, 500);
      return () => clearTimeout(timeOutId);
    } else {
      setNeedRerender(true);
    }
  }, [country]);

  const closeModal = () => {
    setOpenModal(false);
  };
  const min = new Date();
  const max = new Date(min);
  max.setDate(min.getDate() + 15);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      validateFieldForm(
        country,
        dataStart,
        dataEnd,
        setErrorCity,
        setErrorStartDate,
        setEndDate
      )
    ) {
      const imageURL = await getPhoto(country);
      const trip: ITripCard = {
        city: country,
        dayBegin: dataStart,
        dayFinish: dataEnd,
        img: imageURL ? imageURL : "",
      };
      const list = localStorage.getItem("TripList");
      const parsList = list && JSON.parse(list);
      parsList.push(trip);
      setArrTrips(parsList);
      localStorage.setItem("TripList", JSON.stringify(parsList));
    }
    closeModal();
  };

  const [isFocusedStart, setIsFocusedStart] = useState(false);
  const [isFocusedEnd, setIsFocusedEnd] = useState(false);

  const handleFocusStart = () => {
    setIsFocusedStart(true);
  };
  const handleBlurStart = () => {
    setIsFocusedStart(false);
  };
  const handleFocusEnd = () => {
    setIsFocusedEnd(true);
  };
  const handleBlurEnd = () => {
    setIsFocusedEnd(false);
  };
  return (
    <div className={s.modal}>
      <form onSubmit={onSubmit} className={s.modalForm}>
        <div className={s.titleLine}>
          <h4 className={s.title}>Create trip</h4>
          <Image
            src={close}
            alt="close"
            width={18}
            height={18}
            onClick={closeModal}
            className={s.buttonClose}
          />
        </div>
        <div className={s.horizontalLine}></div>
        <div className={s.fields}>
          <h4 className={s.titlesFields}>City</h4>
          <input
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className={cn(s.field, { [s.cityError]: errorCity })}
            placeholder="Please select a city"
            type="text"
          />
          {errorCity && <p className={s.errorText}>{errorCity}</p>}

          <div className={s.searchList}>
            {arrCountry && arrCountry.length > 0 && (
              <ListResultCountrySearch
                arrCountry={arrCountry}
                setCountry={setCountry}
                setArrCountry={setArrCountry}
                setNeedRerender={setNeedRerender}
              />
            )}
          </div>
          <h4 className={s.titlesFields}>Start data</h4>

          <div className={s.container}>
            <input
              value={dataStart}
              onChange={(e) => {
                setDataStart(e.target.value);
              }}
              min={formatDate(min)}
              max={formatDate(max)}
              className={cn(s.field, { [s.cityError]: errorStartDate })}
              type={isFocusedStart ? "date" : "text"}
              onFocus={handleFocusStart}
              onBlur={handleBlurStart}
              placeholder="Select data"
            />
            <Image
              className={s.icon}
              src={calendar}
              alt="calendar"
              width={13}
              height={13}
            />
          </div>
          {errorStartDate && <p className={s.errorText}>{errorStartDate}</p>}

          <h4 className={s.titlesFields}>End data</h4>
          <div className={s.container}>
            <input
              value={dataEnd}
              onChange={(e) => {
                setDataEnd(e.target.value);
              }}
              min={formatDate(min)}
              max={formatDate(max)}
              className={cn(s.field, { [s.cityError]: errorEndDate })}
              type={isFocusedEnd ? "date" : "text"}
              onFocus={handleFocusEnd}
              onBlur={handleBlurEnd}
              placeholder="Select data"
            />
            <Image
              className={s.icon}
              src={calendar}
              alt="calendar"
              width={13}
              height={13}
            />
          </div>
          {errorEndDate && <p className={s.errorText}>{errorEndDate}</p>}
        </div>
        <div className={s.horizontalLine}></div>
        <div className={s.buttonContainer}>
          <button className={s.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button className={s.save} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddNewTrip;
