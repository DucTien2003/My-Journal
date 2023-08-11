import { Dayjs } from "dayjs";

// Add zero
export const addZero = (number: number) => {
  return number < 10 ? "0" + number : number;
};

export const extend = Object.assign;

// Dayjs
export const getDate = (date: Dayjs) => {
  return date.format("YYYY-MM-DD");
};
export const getTime = (time: Dayjs) => {
  return time.format("HH:mm");
};
