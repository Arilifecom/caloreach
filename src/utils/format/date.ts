import { addDays, format } from "date-fns";
import { ja } from "date-fns/locale";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

// M月d日(E)
export const formatDateWithDay = (date: Date) => {
  return format(date, "M月d日(E)", { locale: ja });
};

// yyyy-MM-dd
export const formatYYMMDD = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

// yyyy
export const formatYY = (date: Date) => {
  return format(date, "yyyy");
};

// HH:mm
export const formatTime = (date: Date) => {
  return format(date, "HH:mm");
};

// JST Date
export const createJstDate = (date: string, time: string) => {
  return toZonedTime(`${date} ${time}`, "Asia/Tokyo");
};

// TargetKcalPlans initial date
export const formattedTomorrow = (date: Date = new Date()) => {
  return format(addDays(date, 1), "yyyy-MM-dd");
};

const JST = "Asia/Tokyo";

//UTC String to Tokyo String
export const formatUtcToJstTime = (utcDate: string) =>
  formatInTimeZone(utcDate, JST, "HH:mm", { locale: ja });

//UTC String to Tokyo String
export const formatUtcToJstYYMMDD = (utcDate: string) =>
  formatInTimeZone(utcDate, JST, "yyyy-MM-dd", { locale: ja });

export function getTodayJST() {
  return formatInTimeZone(new Date(), JST, "yyyy-MM-dd");
}
