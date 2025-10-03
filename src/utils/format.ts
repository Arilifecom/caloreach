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
