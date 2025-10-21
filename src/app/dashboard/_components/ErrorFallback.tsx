"use client";

import { Button } from "@/components/ui";
import { memo, useEffect } from "react";
import { toast } from "sonner";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function Component({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  useEffect(() => {
    toast.error(
      <div>
        <p>データの読み込みに失敗しました</p>
      </div>
    );
  }, [error, resetErrorBoundary]);

  return (
    <div className="text-center space-y-2">
      <h2>データ取得失敗</h2>
      <Button variant={"outline"} onClick={() => resetErrorBoundary()}>
        再試行
      </Button>
    </div>
  );
}

const ErrorFallback = memo(Component);
export { ErrorFallback };
