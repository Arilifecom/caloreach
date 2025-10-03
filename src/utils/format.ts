import { format } from "date-fns";

export const getTodayMMDD = (date: Date) => {
  return format(date, "M月d日");
};

export const getTodayYYMMDD = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getNowTime = () => {
  return format(new Date(), "HH:mm");
};

//convert Number full-width to half-width
export const toHalfWidth = (val: string) =>
  val.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
