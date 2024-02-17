import { ICountry } from "@/api/countryApi/county.type";
import { Dispatch, FC, SetStateAction } from "react";
import s from "./style.module.scss";

interface ListResultCountrySearchProps {
  arrCountry: ICountry[];
  setCountry: Dispatch<SetStateAction<string>>;
  setArrCountry: Dispatch<SetStateAction<ICountry[]>>;
  setNeedRerender: Dispatch<SetStateAction<boolean>>;
}

const ListResultCountrySearch: FC<ListResultCountrySearchProps> = ({
  arrCountry,
  setCountry,
  setArrCountry,
  setNeedRerender,
}) => {
  const renderListCountry = arrCountry.map((city, index) => (
    <div
      className={s.item}
      key={index}
      onClick={() => {
        setCountry(city.city);
        setArrCountry([]);
        setNeedRerender(false);
      }}
    >
      {city.city}
    </div>
  ));
  return <div className={s.containerList}>{renderListCountry}</div>;
};

export default ListResultCountrySearch;
