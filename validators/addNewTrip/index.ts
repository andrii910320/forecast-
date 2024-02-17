import { Dispatch, SetStateAction } from "react";

export const validateFieldForm = (
  city: string,
  dateStart: string,
  dataEnd: string,
  setErrorCity: Dispatch<SetStateAction<string>>,
  setErrorStartDate: Dispatch<SetStateAction<string>>,
  setEndDate: Dispatch<SetStateAction<string>>
) => {
  if (!city) {
    setErrorCity("This required field!");
    return false;
  }
  setErrorCity("");
  if (!dateStart) {
    setErrorStartDate("This required field!");
    return false;
  }
  setErrorStartDate("");
  if (!dataEnd) {
    setEndDate("This required field!");
    return false;
  }
  setEndDate("");
  const correctDefineDate =
    new Date(dataEnd).getDate() - new Date(dateStart).getDate();
  if (correctDefineDate < 0) {
    setErrorStartDate("Put correct date start trip!");
    setEndDate("Put correct date end trip!");
  } else {
    setErrorStartDate("");
    setEndDate("");
  }

  return true;
};
