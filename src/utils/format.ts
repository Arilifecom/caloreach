import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const now = () => {
  return new Date();
};

export const getToday = () => {
  return format(now(), "yyyy-MM-dd");
};

export const formatDateWithDay = (date: Date) => {
  return format(date, "M月d日(E)", { locale: ja });
};

export const formatYYMMDD = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatTime = (date: Date) => {
  return format(date, "HH:mm");
};

export const getCurrentDate = () => {
  return format(now(), "yyyy-MM-dd");
};

export const getCurrentTime = () => {
  return format(now(), "HH:mm");
};

//convert Number full-width to half-width
export const toHalfWidth = (val: string) =>
  val.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

// JST Date
export const createJstDate = (date: string, time: string) => {
  return toZonedTime(`${date} ${time}`, "Asia/Tokyo");
};
