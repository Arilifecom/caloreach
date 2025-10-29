import { Query } from "@tanstack/react-query";
import { toast } from "sonner";

export const enum TErrCodes {
  MEAL_FETCH_FAILED,
  FOOD_SEARCH_FAILED,
  REGULAR_FOOD_SEARCH_FAILED,
}

export function handleQueryError(
  error: unknown,
  query: Query<unknown, unknown, unknown, readonly unknown[]>
) {
  console.error(error);

  switch (query.meta?.errCode) {
    case TErrCodes.MEAL_FETCH_FAILED:
      return toast.error("食事履歴の取得に失敗しました");
    case TErrCodes.FOOD_SEARCH_FAILED:
      return toast.error("食事検索の取得に失敗しました");
    case TErrCodes.REGULAR_FOOD_SEARCH_FAILED:
      return toast.error("レギュラーフードの取得に失敗しました");
    default:
      toast.error("データ取得に失敗しました");
  }
}
