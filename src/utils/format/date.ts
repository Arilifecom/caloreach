import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const now = () => {
  return new Date();
};

// yyyy-MM-dd
export const getToday = () => {
  return format(now(), "yyyy-MM-dd");
};

// M月d日(E)
export const formatDateWithDay = (date: Date) => {
  return format(date, "M月d日(E)", { locale: ja });
};

// yyyy-MM-dd
export const formatYYMMDD = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

// HH:mm
export const formatTime = (date: Date) => {
  return format(date, "HH:mm");
};

//yyyy-MM-dd
export const getCurrentDate = () => {
  return format(now(), "yyyy-MM-dd");
};

//HH:mm
export const getCurrentTime = () => {
  return format(now(), "HH:mm");
};

// JST Date
export const createJstDate = (date: string, time: string) => {
  return toZonedTime(`${date} ${time}`, "Asia/Tokyo");
};
