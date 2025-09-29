import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const getTodayMMDD = (): string => {
  return format(new Date(), "M月d日", { locale: ja });
};

export const getTodayYYMMDD = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getNowTime = (): string => {
  return format(new Date(), "HH:mm");
};
