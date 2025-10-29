"use client";

import { Button } from "@/components/ui";

type FetchErrorMessage = {
  onRetry: () => void;
};

export const FetchErrorMessage = ({ onRetry }: FetchErrorMessage) => {
  return (
    <div className="text-center space-y-2">
      <h2>データ取得に失敗しました。</h2>
      <Button variant={"outline"} onClick={onRetry}>
        再試行
      </Button>
    </div>
  );
};
